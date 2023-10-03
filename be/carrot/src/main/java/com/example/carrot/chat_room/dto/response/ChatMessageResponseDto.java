package com.example.carrot.chat_room.dto.response;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ChatMessageResponseDto {
	@JsonProperty("chattingId")
	private Long chattingId;
	@JsonProperty("content")
	private String content;
	@JsonProperty("senderId")
	private Long senderId;
	@JsonProperty("isRead")
	private boolean isRead;
	@JsonProperty("createdAt")
	private LocalDateTime createdAt;

	@Builder
	public ChatMessageResponseDto(Long id, String content, Long senderId, boolean isRead, LocalDateTime createdAt) {
		this.chattingId = id;
		this.content = content;
		this.senderId = senderId;
		this.isRead = isRead;
		this.createdAt = createdAt;
	}

	public boolean getIsRead() {
		return isRead;
	}
}
