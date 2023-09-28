package com.example.carrot.chat_message.controller;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.stereotype.Controller;

import com.example.carrot.chat_message.dto.MessageDto;
import com.example.carrot.chat_message.service.ChatMessageService;
import com.example.carrot.global.common.ApiResponse;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
@RequiredArgsConstructor
public class ChatMessageController {

	private final ChatMessageService chatMessageService;

	/**
	 * websocket "/publish/message"로 들어오는 메시징을 처리한다.
	 */
	@MessageMapping("/message")
	public ApiResponse<Void> message(MessageDto message) {
		log.info("chatroom id : {} ", message.getChatroomId());
		chatMessageService.sendMessage(message);
		return ApiResponse.success();
	}
}
