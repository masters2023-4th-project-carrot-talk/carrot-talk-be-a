package com.example.carrot.user.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class UserNicknameResponseDto {

	@JsonProperty("accessToken")
	private final String accessToken;

	public static UserNicknameResponseDto of(String accessToken) {
		return new UserNicknameResponseDto(accessToken);
	}
}
