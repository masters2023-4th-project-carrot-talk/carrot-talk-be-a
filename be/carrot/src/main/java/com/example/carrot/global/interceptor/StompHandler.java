package com.example.carrot.global.interceptor;

import java.util.Objects;

import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.stereotype.Component;

import com.example.carrot.chat_message.dto.Entry;
import com.example.carrot.chat_message.service.ChatMessageService;
import com.example.carrot.chat_room.service.ChatRoomService;
import com.example.carrot.global.jwt.JwtProvider;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.security.SignatureException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Order(Ordered.HIGHEST_PRECEDENCE + 99)
@Slf4j
@Component
@RequiredArgsConstructor
public class StompHandler implements ChannelInterceptor {

	private static final String USER_ID = "userId";
	private final JwtProvider jwtProvider;
	private final ChatRoomService chatRoomService;
	private final ChatMessageService chatMessageService;

	@Override
	public Message<?> preSend(Message<?> message, MessageChannel channel) {
		StompHeaderAccessor accessor = StompHeaderAccessor.wrap(message);
		log.info("StompAccessor = {}", accessor);
		handleMessage(accessor.getCommand(), accessor);
		return message;
	}

	private void handleMessage(StompCommand command, StompHeaderAccessor accessor) {
		switch (command) {
			case CONNECT:
				log.info("CONNECT !!");
				Long userId = validateToken(accessor);
				Long chatroomId = getChatRoomId(accessor);
				validateChatUser(userId, chatroomId);
				connectToChatRoom(accessor, chatroomId, userId);
				enterChatRoom(chatroomId, userId);
				break;
			case SUBSCRIBE:
				log.info("SUBSCRIBE !!");
				break;
			case SEND:
				log.info("SEND !!");
				break;
			case DISCONNECT:
				log.info("DISCONNECT !!");
				disconnectChatRoom(accessor);
		}
	}

	private void validateChatUser(Long userId, Long chatroomId) {
		chatRoomService.validateChatUser(userId, chatroomId);
	}

	private void enterChatRoom(Long chatroomId, Long userId) {
		Entry entry = new Entry(chatroomId, userId);
		chatMessageService.sendEntry(entry);
	}

	private Long validateToken(StompHeaderAccessor accessor) {
		try {
			String token = getAccessToken(accessor);
			Claims claims = jwtProvider.getClaims(token);
			return Long.valueOf((Integer)claims.get(USER_ID));
		} catch (ExpiredJwtException | UnsupportedJwtException | MalformedJwtException | SignatureException |
				 IllegalArgumentException e) {
			// Todo: exception handler 만들어서 잡아야 함.
			throw new IllegalArgumentException(e);
		}
	}

	private String getAccessToken(StompHeaderAccessor accessor) {
		return accessor.getFirstNativeHeader("Authorization");
	}

	private void connectToChatRoom(StompHeaderAccessor accessor, Long chatroomId, Long userId) {
		log.info("chat connect user id : {} ", accessor.getSessionId());
		chatRoomService.connectChatRoom(chatroomId, accessor.getSessionId());
		chatMessageService.readMessageCountByChatRoom(chatroomId, userId);
	}

	private Long getChatRoomId(StompHeaderAccessor accessor) {
		return Long.parseLong(Objects.requireNonNull(accessor.getFirstNativeHeader("ChatroomId")));
	}

	private void disconnectChatRoom(StompHeaderAccessor accessor) {
		chatRoomService.disconnectChatRoom(accessor.getSessionId());
	}
}
