package com.example.carrot.chat_room.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ChatRoomOpponentDto {

	private Long id;
	private String nickname;
	private String imageUrl;

	@Builder
	public ChatRoomOpponentDto(Long id, String nickname, String imageUrl) {
		this.id = id;
		this.nickname = nickname;
		this.imageUrl = imageUrl;
	}
}
