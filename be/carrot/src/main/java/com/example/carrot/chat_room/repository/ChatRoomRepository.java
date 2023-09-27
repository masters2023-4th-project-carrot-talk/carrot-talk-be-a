package com.example.carrot.chat_room.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.carrot.chat_room.entity.ChatRoom;

@Repository
public interface ChatRoomRepository extends JpaRepository<ChatRoom, Long> {

	@Query("select c from ChatRoom c where c.user.userId = :userId and c.product.productId = :productId")
	Optional<ChatRoom> findByUserIdAndProductId(@Param("userId") Long userId, @Param("productId") Long productId);
}
