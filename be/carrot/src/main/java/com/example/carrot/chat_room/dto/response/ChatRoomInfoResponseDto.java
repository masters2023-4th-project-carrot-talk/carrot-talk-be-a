package com.example.carrot.chat_room.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ChatRoomInfoResponseDto {
	@JsonProperty("opponent")
	private ChatRoomOpponentInfoDto chatRoomOpponentInfoDto;
	@JsonProperty("product")
	private ChatRoomProductInfoDto chatRoomProductInfoDto;

	@Builder
	public ChatRoomInfoResponseDto(ChatRoomOpponentInfoDto chatRoomOpponentInfoDto,
		ChatRoomProductInfoDto chatRoomProductInfoDto) {
		this.chatRoomOpponentInfoDto = chatRoomOpponentInfoDto;
		this.chatRoomProductInfoDto = chatRoomProductInfoDto;
	}
}
