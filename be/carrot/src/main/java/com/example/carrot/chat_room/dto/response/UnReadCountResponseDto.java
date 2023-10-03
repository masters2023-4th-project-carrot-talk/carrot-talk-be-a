package com.example.carrot.chat_room.dto.response;

import lombok.Getter;

@Getter
public class UnReadCountResponseDto {

	private int unreadTotalCount;

	public UnReadCountResponseDto(int unreadTotalCount) {
		this.unreadTotalCount = unreadTotalCount;
	}

	public static UnReadCountResponseDto of(int totalCount) {
		return new UnReadCountResponseDto(totalCount);
	}
}
