package com.example.carrot.user.dto.response;

import com.example.carrot.global.jwt.Jwt;
import com.example.carrot.user.entity.User;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class LoginResponseDto {
	@JsonProperty("accessToken")
	private String accessToken;
	@JsonProperty("refreshToken")
	private String refreshToken;

	@JsonProperty("isUser")
	private boolean isUser;

	@JsonProperty("user")
	private User user;

	@Builder
	public LoginResponseDto(String accessToken, String refreshToken, boolean isUser, User user) {
		this.accessToken = accessToken;
		this.refreshToken = refreshToken;
		this.isUser = isUser;
		this.user = user;
	}

	public static LoginResponseDto of(String accessToken, boolean isUser) {
		return LoginResponseDto.builder()
			.accessToken(accessToken)
			.isUser(isUser)
			.build();
	}

	public static LoginResponseDto of(Jwt jwt, User user, boolean isUser) {
		return LoginResponseDto.builder()
			.accessToken(jwt.getAccessToken())
			.refreshToken(jwt.getRefreshToken())
			.user(user)
			.isUser(isUser)
			.build();
	}
}
