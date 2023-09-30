package com.example.carrot.chat_room.dto.response;

import java.time.LocalDateTime;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ChatRoomResponseDto {
	private Long chatroomId;
	private String lastChatContent;
	private LocalDateTime lastChatTime;
	private int unreadChatCount;
	private ChatRoomOpponentDto opponent;
	private ChatRoomProductDto product;

	@Builder
	public ChatRoomResponseDto(Long chatroomId, String lastChatContent, LocalDateTime lastChatTime,
		int unreadChatCount, ChatRoomOpponentDto opponent, ChatRoomProductDto product) {
		this.chatroomId = chatroomId;
		this.lastChatContent = lastChatContent;
		this.lastChatTime = lastChatTime;
		this.unreadChatCount = unreadChatCount;
		this.opponent = opponent;
		this.product = product;
	}
}
