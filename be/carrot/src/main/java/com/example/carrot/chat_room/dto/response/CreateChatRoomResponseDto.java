package com.example.carrot.chat_room.dto.response;

import com.example.carrot.chat_room.entity.ChatRoom;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class CreateChatRoomResponseDto {

	private Long chatroomId;

	public static CreateChatRoomResponseDto of(ChatRoom savedChatRoom) {
		return new CreateChatRoomResponseDto(savedChatRoom.getId());
	}
}
