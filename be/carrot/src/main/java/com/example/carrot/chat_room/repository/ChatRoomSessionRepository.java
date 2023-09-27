package com.example.carrot.chat_room.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.example.carrot.chat_room.entity.ChatRoomSession;

@Repository
public interface ChatRoomSessionRepository extends CrudRepository<ChatRoomSession, Long> {

	Optional<ChatRoomSession> findBySessionId(String sessionId);

	List<ChatRoomSession> findByChatRoomId(Long chatRoomId);
}
