package com.example.carrot.chat_room.repository;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.example.carrot.chat_room.dto.response.ChatRoomResponseDto;

@Repository
public interface QueryChatRoomRepository {

	List<ChatRoomResponseDto> findChatRoomsByUserId(Long userId);
}
