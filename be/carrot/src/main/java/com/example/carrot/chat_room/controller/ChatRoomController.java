package com.example.carrot.chat_room.controller;

import javax.validation.Valid;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.carrot.chat_room.dto.request.ChatRoomRequestDto;
import com.example.carrot.chat_room.dto.response.ChatRoomResponseDto;
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
	private ApiResponse<ChatRoomResponseDto> createChatRoom(@Valid @RequestBody ChatRoomRequestDto chatRoomRequestDto,
		@RequestAttribute Long userId) {
		ChatRoomResponseDto chatRoomResponseDto = chatRoomService.createChatRoom(chatRoomRequestDto, userId);
		return ApiResponse.success(chatRoomResponseDto);
	}
}
