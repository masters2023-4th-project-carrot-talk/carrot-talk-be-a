package com.example.carrot.user.service;


import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.reactive.function.client.WebClient;

import com.example.carrot.user.dto.response.LoginResponseDto;
import com.example.carrot.user.dto.response.OauthTokenResponseDto;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class UserService {

	@Value("${oauth.kakao.client_id}")
	private String clientId;

	@Value("${oauth.kakao.client_secret}")
	private String clientSecret;

	@Value("${oauth.kakao.grant_type}")
	private String grantType;

	@Value("${oauth.kakao.redirect_uri}")
	private String redirectUri;


	public LoginResponseDto kakaoLogin(String code) {
		OauthTokenResponseDto tokenResponse = getToken(code);
		log.info("access token : "+tokenResponse.getAccessToken());
		log.info("scope : "+tokenResponse.getScope());

		Map<String, Object> userInfo = findUserInfo(tokenResponse.getAccessToken());
		log.info("social id : "+String.valueOf(userInfo.get("id")));
		log.info("profile img : "+String.valueOf(((Map)((Map) userInfo.get("kakao_account")).get("profile")).get("thumbnail_image_url")));

		return null;
	}

	private OauthTokenResponseDto getToken(String code) {
		MultiValueMap<String, String> formData = new LinkedMultiValueMap<>();
		formData.add("code", code);
		formData.add("client_id", clientId);
		formData.add("grant_type", grantType);
		formData.add("client_secret", clientSecret);
		formData.add("redirect_uri", redirectUri);

		return WebClient.create()
			.post()
			.uri("https://kauth.kakao.com/oauth/token")
			.header("Content-type", "application/x-www-form-urlencoded;charset=utf-8")
			.bodyValue(formData)
			.retrieve()
			.bodyToMono(OauthTokenResponseDto.class)
			.block();
	}

	private Map<String, Object> findUserInfo(String accessToken) {
		return WebClient.create()
			.get()
			.uri("https://kapi.kakao.com/v2/user/me")
			.header("Content-type", "application/x-www-form-urlencoded;charset=utf-8")
			.header("Authorization", "Bearer " + accessToken)
			.retrieve()
			.bodyToMono(new ParameterizedTypeReference<Map<String, Object>>() {
			})
			.block();
	}
}
