package com.example.carrot.chat_room.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.carrot.chat_room.dto.request.ChatRoomRequestDto;
import com.example.carrot.chat_room.dto.response.ChatRoomResponseDto;
import com.example.carrot.chat_room.entity.ChatRoom;
import com.example.carrot.chat_room.repository.ChatRoomRepository;
import com.example.carrot.global.exception.CustomException;
import com.example.carrot.global.exception.StatusCode;
import com.example.carrot.product.entity.Product;
import com.example.carrot.product.repository.ProductRepository;
import com.example.carrot.user.entity.User;
import com.example.carrot.user.repository.UserRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ChatRoomService {

	private final ChatRoomRepository chatRoomRepository;
	private final UserRepository userRepository;
	private final ProductRepository productRepository;

	// 해당하는 채팅방 있으면 응답하고 없으면 새로 생성해서 응답한다.
	@Transactional
	public ChatRoomResponseDto createChatRoom(ChatRoomRequestDto chatRoomRequestDto, Long userId) {
		Long productId = chatRoomRequestDto.getProductId();
		ChatRoom chatRoom = chatRoomRepository.findByUserIdAndProductId(userId, productId)
			.orElseGet(() -> createNewChatRoom(userId, productId));

		return ChatRoomResponseDto.of(chatRoom);
	}

	private ChatRoom createNewChatRoom(Long userId, Long productId) {
		return chatRoomRepository.save(ChatRoom.builder()
			.user(getUser(userId))
			.product(getProduct(productId))
			.build());
	}

	private Product getProduct(Long productId) {
		return productRepository.findById(productId)
			.orElseThrow(() -> new CustomException(StatusCode.NOT_FOUND_PRODUCT));
	}

	private User getUser(Long userId) {
		return userRepository.findById(userId)
			.orElseThrow(() -> new CustomException(StatusCode.NOT_FOUND_USER));
	}
}
