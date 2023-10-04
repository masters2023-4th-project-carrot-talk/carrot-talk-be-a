package com.example.carrot.chat_room.dto.response;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Builder;

public class ChatMessageResponseDtos {

	@JsonProperty("chattings")
	private List<ChatMessageResponseDto> chatMessageResponseDtos;

	@JsonProperty("nextId")
	private Long nextId;

	@Builder
	public ChatMessageResponseDtos(List<ChatMessageResponseDto> chatMessageResponseDtos, Long nextId) {
		this.chatMessageResponseDtos = chatMessageResponseDtos;
		this.nextId = nextId;
	}

	public static ChatMessageResponseDtos of(List<ChatMessageResponseDto> removedLastChatMessages, Long next) {
		return ChatMessageResponseDtos.builder()
			.chatMessageResponseDtos(removedLastChatMessages)
			.nextId(next)
			.build();
	}
}
