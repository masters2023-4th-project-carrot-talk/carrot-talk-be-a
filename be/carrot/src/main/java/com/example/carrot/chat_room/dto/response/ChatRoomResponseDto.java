package com.example.carrot.chat_room.dto.response;

import com.example.carrot.chat_room.entity.ChatRoom;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ChatRoomResponseDto {

	private Long chatroomId;

	public static ChatRoomResponseDto of(ChatRoom savedChatRoom) {
		return new ChatRoomResponseDto(savedChatRoom.getId());
	}
}
