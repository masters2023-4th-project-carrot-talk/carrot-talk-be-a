package com.example.carrot.chat_room.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ChatRoomOpponentInfoDto {
	private Long id;
	private String nickName;

	@Builder
	public ChatRoomOpponentInfoDto(Long id, String nickName) {
		this.id = id;
		this.nickName = nickName;
	}
}
