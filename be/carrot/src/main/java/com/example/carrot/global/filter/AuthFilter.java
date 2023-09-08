package com.example.carrot.global.filter;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.util.PatternMatchUtils;
import org.springframework.web.cors.CorsUtils;

import com.example.carrot.global.common.ApiResponse;
import com.example.carrot.global.exception.ErrorCode;
import com.example.carrot.global.exception.StatusCode;
import com.example.carrot.global.jwt.JwtProvider;
import com.fasterxml.jackson.databind.ObjectMapper;

import io.jsonwebtoken.Claims;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public class AuthFilter implements Filter {

	private static final int BEARER_LENGTH = 7;
	private static final String SOCIAL_ID = "socialId";
	private static final String IMAGE_URL = "imgUrl";
	private static final String USER_ID = "userId";
	private static final String CHARACTER_ENCODING = "UTF-8";
	private static final String HEADER_AUTHORIZATION = "Authorization";
	private static final String TOKEN_PREFIX = "Bearer ";

	@Value("${filter.allowed-uris}")
	private String[] whiteListUris;

	@Value("${filter.users-signup-uri}")
	private String signupUri;

	private final ObjectMapper objectMapper;
	private final JwtProvider jwtProvider;

	public AuthFilter(ObjectMapper objectMapper, JwtProvider jwtProvider) {
		this.objectMapper = objectMapper;
		this.jwtProvider = jwtProvider;
	}

	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws
		IOException,
		ServletException {

		HttpServletRequest httpServletRequest = (HttpServletRequest)request;
		HttpServletResponse httpServletResponse = (HttpServletResponse)response;

		if (CorsUtils.isPreFlightRequest(httpServletRequest)) {
			chain.doFilter(request, response);
			return;
		}

		if (whiteListCheck(httpServletRequest.getRequestURI())) {
			log.info("whileListCheck 진입");
			if (isSignupUri(httpServletRequest.getRequestURI())) {
				processSignupJwt(httpServletRequest, httpServletResponse);
			}
			chain.doFilter(request, response);
			return;
		}

		try {
			if (!isContainToken(httpServletRequest)) {
				request.setAttribute(USER_ID, null);
				chain.doFilter(request, response);
				return;
			}

			Claims claims = jwtProvider.getClaims(getToken(httpServletRequest));

			request.setAttribute(USER_ID, claims.get(USER_ID));
			chain.doFilter(request, response);
		} catch (RuntimeException e) {
			log.debug(e.getClass().getName());
			sendErrorApiResponse(httpServletResponse, e);
		}
	}

	private boolean isSignupUri(String uri) {
		return signupUri.equals(uri);
	}

	private void processSignupJwt(HttpServletRequest request, HttpServletResponse httpServletResponse) throws
		IOException {
		try {
			Claims claims = jwtProvider.getClaims(getToken(request));
			request.setAttribute(SOCIAL_ID, claims.get(SOCIAL_ID));
			request.setAttribute(IMAGE_URL, claims.get(IMAGE_URL));
		} catch (RuntimeException e) {
			log.info(e.getClass().getName());
			sendErrorApiResponse(httpServletResponse, e);
		}
	}

	private void sendErrorApiResponse(HttpServletResponse response, RuntimeException e) throws IOException {
		response.setCharacterEncoding(CHARACTER_ENCODING);

		response.setContentType(MediaType.APPLICATION_JSON_VALUE);
		response.setStatus(HttpStatus.UNAUTHORIZED.value());

		response.getWriter().write(
			objectMapper.writeValueAsString(generateErrorApiResponse(e)));
	}

	private ApiResponse<ErrorCode> generateErrorApiResponse(RuntimeException e) {
		StatusCode statusCode = StatusCode.from(e);

		return ApiResponse.fail(new ErrorCode(statusCode.getStatus(), statusCode.getMessage()));
	}

	private boolean isContainToken(HttpServletRequest httpServletRequest) {
		String authorization = httpServletRequest.getHeader(HEADER_AUTHORIZATION);
		return authorization != null && authorization.startsWith(TOKEN_PREFIX);
	}

	private boolean whiteListCheck(String uri) {
		return PatternMatchUtils.simpleMatch(whiteListUris, uri);
	}

	private String getToken(HttpServletRequest request) {
		String authorization = request.getHeader(HEADER_AUTHORIZATION);
		return authorization.substring(BEARER_LENGTH);
	}
}
