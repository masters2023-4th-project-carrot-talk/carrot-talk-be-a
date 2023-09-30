package com.example.carrot.chat_room.dto.response;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ChatMessageResponseDto {
	@JsonProperty("id")
	private Long id;
	@JsonProperty("content")
	private String content;
	@JsonProperty("isMine")
	private boolean isMine;
	@JsonProperty("isRead")
	private boolean isRead;
	@JsonProperty("createdAt")
	private LocalDateTime createdAt;

	@Builder
	public ChatMessageResponseDto(Long id, String content, boolean isMine, boolean isRead, LocalDateTime createdAt) {
		this.id = id;
		this.content = content;
		this.isMine = isMine;
		this.isRead = isRead;
		this.createdAt = createdAt;
	}

	public boolean getIsMine() {
		return isMine;
	}

	public boolean getIsRead() {
		return isRead;
	}
}
