package com.example.carrot.chat_room.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ChatRoomProductInfoDto {
	private Long id;
	private String title;
	private Long price;
	private String thumbnail;

	@Builder
	public ChatRoomProductInfoDto(Long id, String title, Long price, String thumbnail) {
		this.id = id;
		this.title = title;
		this.price = price;
		this.thumbnail = thumbnail;
	}
}
