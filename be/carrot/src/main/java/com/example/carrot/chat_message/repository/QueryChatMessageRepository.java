package com.example.carrot.chat_message.repository;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.example.carrot.chat_room.dto.response.ChatMessageResponseDto;

@Repository
public interface QueryChatMessageRepository {
	List<ChatMessageResponseDto> findChatMessages(Long userId, Long chatroomId,
		Long nextId, int defaultSize);

}
