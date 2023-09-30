package com.example.carrot.chat_message.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.carrot.chat_message.entity.ChatMessage;

@Repository
public interface ChatMessageRepository extends JpaRepository<ChatMessage, Long>, QueryChatMessageRepository {

	@Modifying
	@Query("update ChatMessage cm set cm.isRead = true where cm.chatRoom.id = :chatRoomId and cm.isRead = false and cm.user.userId != :userId")
	int updateMessageByChatRoomIdAndUserId(@Param("chatRoomId") Long chatRoomId, @Param("userId") Long userId);

}
