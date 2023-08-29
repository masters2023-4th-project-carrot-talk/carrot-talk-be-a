package com.example.carrot.user.dto.response;

import com.example.carrot.user.entity.User;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
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
}
