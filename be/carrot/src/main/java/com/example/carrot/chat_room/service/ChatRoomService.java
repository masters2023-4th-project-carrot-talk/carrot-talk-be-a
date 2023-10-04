package com.example.carrot.chat_room.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.carrot.chat_message.repository.ChatMessageRepository;
import com.example.carrot.chat_room.dto.request.ChatRoomRequestDto;
import com.example.carrot.chat_room.dto.response.ChatMessageResponseDto;
import com.example.carrot.chat_room.dto.response.ChatMessageResponseDtos;
import com.example.carrot.chat_room.dto.response.ChatRoomInfoResponseDto;
import com.example.carrot.chat_room.dto.response.ChatRoomResponseDto;
import com.example.carrot.chat_room.dto.response.CreateChatRoomResponseDto;
import com.example.carrot.chat_room.dto.response.UnReadCountResponseDto;
import com.example.carrot.chat_room.entity.ChatRoom;
import com.example.carrot.chat_room.entity.ChatRoomSession;
import com.example.carrot.chat_room.repository.ChatRoomRepository;
import com.example.carrot.chat_room.repository.ChatRoomSessionRepository;
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

	private static final int DEFAULT_CHAT_SIZE = 20;

	private final ChatRoomSessionRepository chatRoomSessionRepository;
	private final ChatRoomRepository chatRoomRepository;
	private final UserRepository userRepository;
	private final ProductRepository productRepository;
	private final ChatMessageRepository chatMessageRepository;

	/*
	 * 해당하는 채팅방 있으면 응답하고 없으면 새로 생성해서 응답한다.
	 * 서버간 채팅방 공유를 위해 redis hash에 저장한다.
	 */
	@Transactional
	public CreateChatRoomResponseDto createChatRoom(ChatRoomRequestDto chatRoomRequestDto, Long userId) {
		Long productId = chatRoomRequestDto.getProductId();
		ChatRoom chatRoom = chatRoomRepository.findByUserIdAndProductId(userId, productId)
			.orElseGet(() -> createNewChatRoom(userId, productId));

		return CreateChatRoomResponseDto.of(chatRoom);
	}

	private ChatRoom createNewChatRoom(Long userId, Long productId) {
		return chatRoomRepository.save(ChatRoom.create(getUser(userId), getProduct(productId)));
	}

	private Product getProduct(Long productId) {
		return productRepository.findById(productId)
			.orElseThrow(() -> new CustomException(StatusCode.NOT_FOUND_PRODUCT));
	}

	private User getUser(Long userId) {
		return userRepository.findById(userId)
			.orElseThrow(() -> new CustomException(StatusCode.NOT_FOUND_USER));
	}

	/**
	 * redis에 채팅방 입장 정보 저장
	 */
	public void connectChatRoom(Long chatRoomId, String sessionId) {
		chatRoomSessionRepository.save(ChatRoomSession.create(sessionId, chatRoomId));
	}

	/**
	 * redis에서 채팅방 입장 정보 삭제
	 */
	public void disconnectChatRoom(String sessionId) {
		chatRoomSessionRepository.findBySessionId(sessionId)
			.ifPresent(chatRoomSession -> chatRoomSessionRepository.deleteById(chatRoomSession.getId()));
	}

	public UnReadCountResponseDto getUnReadTotalCount(Long userId) {
		int totalCount = chatRoomRepository.findTotalUnReadCountByUserId(userId);
		return UnReadCountResponseDto.of(totalCount);
	}

	/**
	 * default size +1 만큼 메세지를 가져와서 있으면 next로 응답, 없으면 null로 응답
	 */
	public ChatMessageResponseDtos getChatMessages(Long userId, Long chatroomId, Long nextId) {
		List<ChatMessageResponseDto> chatMessageResponseDtos = chatMessageRepository.findChatMessages(userId,
			chatroomId,
			nextId, DEFAULT_CHAT_SIZE);
		Long next = findNextChatMessage(chatMessageResponseDtos);
		List<ChatMessageResponseDto> removedLastChatMessages = getRemovedLastChatMessages(chatMessageResponseDtos);
		return ChatMessageResponseDtos.of(removedLastChatMessages, next);
	}

	private List<ChatMessageResponseDto> getRemovedLastChatMessages(
		List<ChatMessageResponseDto> chatMessageResponseDtos) {
		if (chatMessageResponseDtos.size() < DEFAULT_CHAT_SIZE) {
			return chatMessageResponseDtos;
		}
		return chatMessageResponseDtos.subList(0, chatMessageResponseDtos.size() - 1);
	}

	private Long findNextChatMessage(List<ChatMessageResponseDto> chatMessageResponseDtos) {
		if (chatMessageResponseDtos.size() < DEFAULT_CHAT_SIZE) {
			return null;
		}
		return chatMessageResponseDtos.get(chatMessageResponseDtos.size() - 1).getChattingId();
	}

	/**
	 * 해당 채팅방의 판매자도 아니고 구매자도 아니면 에러처리
	 */
	public void validateChatUser(Long userId, Long chatroomId) {
		ChatRoom chatRoom = getChatRoomWithProductAndUser(chatroomId);
		Product product = chatRoom.getProduct();
		if (!userId.equals(product.getUser().getUserId()) && !userId.equals(chatRoom.getUser().getUserId())) {
			throw new CustomException(StatusCode.ACCESS_DENIED_CHATROOM);
		}
	}

	private ChatRoom getChatRoomWithProductAndUser(Long chatroomId) {
		return chatRoomRepository.findChatRoomWithProductAndUserById(chatroomId)
			.orElseThrow(() -> new CustomException(StatusCode.NOT_FOUND_CHATROOM));
	}

	public List<ChatRoomResponseDto> getChatRooms(Long userId) {
		return chatRoomRepository.findChatRoomsByUserId(userId);
	}

	public ChatRoomInfoResponseDto getChatRoomInfos(Long userId, Long chatroomId) {
		return chatRoomRepository.findOpponentAndProduct(userId, chatroomId);
	}
}
