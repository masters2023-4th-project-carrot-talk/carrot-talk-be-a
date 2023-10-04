package com.example.carrot.chat_room.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.carrot.chat_room.dto.request.ChatRoomRequestDto;
import com.example.carrot.chat_room.dto.response.ChatMessageResponseDtos;
import com.example.carrot.chat_room.dto.response.ChatRoomInfoResponseDto;
import com.example.carrot.chat_room.dto.response.ChatRoomResponseDto;
import com.example.carrot.chat_room.dto.response.CreateChatRoomResponseDto;
import com.example.carrot.chat_room.dto.response.UnReadCountResponseDto;
import com.example.carrot.chat_room.service.ChatRoomService;
import com.example.carrot.global.common.ApiResponse;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class ChatRoomController {

	private final ChatRoomService chatRoomService;

	/**
	 * 채팅방 만들기 API
	 */
	@PostMapping("/chatrooms")
	public ApiResponse<CreateChatRoomResponseDto> createChatRoom(
		@Valid @RequestBody ChatRoomRequestDto chatRoomRequestDto,
		@RequestAttribute Long userId) {
		CreateChatRoomResponseDto chatRoomResponseDto = chatRoomService.createChatRoom(chatRoomRequestDto, userId);
		return ApiResponse.success(chatRoomResponseDto);
	}

	/**
	 * 안 읽은 전체 채팅 개수 조회 API
	 */
	@GetMapping("/chatrooms/unread-total-count")
	public ApiResponse<UnReadCountResponseDto> getUnReadTotalCount(@RequestAttribute Long userId) {
		UnReadCountResponseDto unReadCountResponseDto = chatRoomService.getUnReadTotalCount(userId);
		return ApiResponse.success(unReadCountResponseDto);
	}

	/**
	 * 채팅 내역 조회 API
	 */
	@GetMapping("/chatrooms/{chatroomId}")
	public ApiResponse<ChatMessageResponseDtos> getChatMessages(@RequestAttribute Long userId,
		@PathVariable Long chatroomId, @RequestParam(required = false) Long next) {
		ChatMessageResponseDtos chatMessageResponseDtos = chatRoomService.getChatMessages(userId, chatroomId, next);
		return ApiResponse.success(chatMessageResponseDtos);
	}

	/**
	 * 채팅방 목록 조회 API
	 */
	@GetMapping("/chatrooms")
	public ApiResponse<List<ChatRoomResponseDto>> getChatRooms(@RequestAttribute Long userId) {
		List<ChatRoomResponseDto> chatRoomsResponseDto = chatRoomService.getChatRooms(userId);
		return ApiResponse.success(chatRoomsResponseDto);
	}

	/**
	 * 채팅방 정보 조회 API
	 */
	@GetMapping("/chatrooms/{chatroomId}/product")
	public ApiResponse<ChatRoomInfoResponseDto> getChatRoomInfos(@RequestAttribute Long userId,
		@PathVariable Long chatroomId) {
		ChatRoomInfoResponseDto chatRoomInfoResponse = chatRoomService.getChatRoomInfos(userId, chatroomId);
		return ApiResponse.success(chatRoomInfoResponse);
	}
}
