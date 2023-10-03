package com.example.carrot.chat_room.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ChatRoomProductDto {
	private Long id;
	private String thumbnail;

	@Builder
	public ChatRoomProductDto(Long id, String thumbnail) {
		this.id = id;
		this.thumbnail = thumbnail;
	}
}
