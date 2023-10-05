package com.example.carrot.chat_room.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.carrot.chat_room.entity.ChatRoom;

@Repository
public interface ChatRoomRepository extends JpaRepository<ChatRoom, Long>, QueryChatRoomRepository {

	@Query("select c from ChatRoom c where c.user.userId = :userId and c.product.productId = :productId")
	Optional<ChatRoom> findByUserIdAndProductId(@Param("userId") Long userId, @Param("productId") Long productId);

	@Query("SELECT count(cm.id) "
		+ "FROM ChatMessage cm "
		+ "         JOIN ChatRoom cr ON cm.chatRoom.id = cr.id "
		+ "         JOIN Product p ON cr.product.productId = p.productId "
		+ "WHERE cm.isRead = false "
		+ "  AND (cr.user.userId = :userId OR p.user.userId = :userId) "
		+ "	 AND cm.user.userId != :userId")
	int findTotalUnReadCountByUserId(@Param("userId") Long userId);

	@Query("SELECT cr FROM ChatRoom cr JOIN FETCH cr.product p JOIN FETCH cr.user u1 JOIN FETCH p.user u2 WHERE cr.id = :chatroomId")
	Optional<ChatRoom> findChatRoomWithProductAndUserById(@Param("chatroomId") Long chatroomId);

	@Query("select c from ChatRoom c "
		+ "join fetch c.product p "
		+ "join fetch c.user u "
		+ "where c.id = :chatroomId")
	Optional<ChatRoom> findChatroomFetchById(@Param("chatroomId") Long chatroomId);
}
