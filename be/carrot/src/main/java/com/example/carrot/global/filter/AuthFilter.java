package com.example.carrot.global.filter;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

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
import io.jsonwebtoken.MalformedJwtException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
public class AuthFilter implements Filter {

	private final String[] whiteListUris = new String[] {"/", "/api/users/login", "/api/users/signup",
		"/oauth/redirect", "/api/users", "/api/users/reissue-access-token"};

	private final ObjectMapper objectMapper;

	private final JwtProvider jwtProvider;

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
			if (httpServletRequest.getRequestURI().equals("/api/users/signup")) {
				try {
					Claims claims = jwtProvider.getClaims(getToken(httpServletRequest));

					request.setAttribute("socialId", claims.get("socialId"));
					request.setAttribute("imgUrl", claims.get("imgUrl"));

				} catch (RuntimeException e) {
					log.debug(e.getClass().getName());
					sendErrorApiResponse(httpServletResponse, e);
				}
			}
			chain.doFilter(request, response);
			return;
		}

		if (!isContainToken(httpServletRequest)) {
			log.info("isContainToken 진입");
			sendErrorApiResponse(httpServletResponse, new MalformedJwtException(""));
			return;
		}

		try {
			Claims claims = jwtProvider.getClaims(getToken(httpServletRequest));
			request.setAttribute("userId", claims.get("userId"));
			chain.doFilter(request, response);
		} catch (RuntimeException e) {
			log.debug(e.getClass().getName());
			sendErrorApiResponse(httpServletResponse, e);
		}
	}

	private void sendErrorApiResponse(HttpServletResponse response, RuntimeException e) throws IOException {
		response.setCharacterEncoding("UTF-8");

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
		String authorization = httpServletRequest.getHeader("Authorization");
		return authorization != null && authorization.startsWith("Bearer ");
	}

	private boolean whiteListCheck(String uri) {
		return PatternMatchUtils.simpleMatch(whiteListUris, uri);
	}

	private String getToken(HttpServletRequest request) {
		String authorization = request.getHeader("Authorization");
		return authorization.substring(7);

	}
}
