package com.example.carrot.chat_room.entity;

import javax.persistence.Id;

import org.springframework.data.redis.core.RedisHash;

import lombok.Builder;
import lombok.Getter;

@Getter
@RedisHash(value = "chatRoomSession")
public class ChatRoomSession {

	@Id
	private Long id;

	private String sessionId;

	private Long chatRoomId;

	@Builder
	public ChatRoomSession(String sessionId, Long chatRoomId) {
		this.sessionId = sessionId;
		this.chatRoomId = chatRoomId;
	}

	public static ChatRoomSession create(String sessionId, Long chatRoomId) {
		return ChatRoomSession.builder()
			.sessionId(sessionId)
			.chatRoomId(chatRoomId)
			.build();
	}
}
