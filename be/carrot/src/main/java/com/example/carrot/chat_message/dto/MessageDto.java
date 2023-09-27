package com.example.carrot.chat_message.dto;

import java.io.Serializable;
import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class MessageDto implements Serializable {
	private Long chatroomId;
	private String content;
	private Long senderId;
	@JsonProperty("isRead")
	private boolean isRead;
	private LocalDateTime chatTime;

	public MessageDto(Long chatroomId, String content, Long senderId, boolean isRead, LocalDateTime chatTime) {
		this.chatroomId = chatroomId;
		this.content = content;
		this.senderId = senderId;
		this.isRead = isRead;
		this.chatTime = chatTime;
	}

	public void setChatTime() {
		this.chatTime = LocalDateTime.now();
	}

	public boolean getIsRead() {
		return isRead;
	}

	public void readMessage() {
		this.isRead = true;
	}
}
