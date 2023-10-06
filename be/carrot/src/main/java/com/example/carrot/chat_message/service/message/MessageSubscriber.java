package com.example.carrot.chat_message.service.message;

import org.springframework.context.ApplicationEventPublisher;
import org.springframework.data.redis.connection.Message;
import org.springframework.data.redis.connection.MessageListener;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import com.example.carrot.chat_message.dto.Entry;
import com.example.carrot.chat_message.dto.MessageDto;
import com.example.carrot.chat_message.service.MessageReceivedEvent;
import com.example.carrot.chat_room.entity.ChatRoom;
import com.example.carrot.chat_room.repository.ChatRoomRepository;
import com.example.carrot.chat_room.repository.ChatRoomSessionRepository;
import com.example.carrot.global.exception.CustomException;
import com.example.carrot.global.exception.StatusCode;
import com.example.carrot.notification.entity.Notification;
import com.example.carrot.notification.service.NotificationService;
import com.example.carrot.user.entity.User;
import com.example.carrot.user.repository.UserRepository;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class MessageSubscriber implements MessageListener {

	private final RedisTemplate<String, Object> redisTemplate;
	private final ObjectMapper objectMapper;
	private final ApplicationEventPublisher eventPublisher;

	private final UserRepository userRepository;
	private final ChatRoomRepository chatRoomRepository;
	private final NotificationService notificationService;
	private final ChatRoomSessionRepository chatRoomSessionRepository;

	/**
	 * Redis에서 메세지가 발행(publish)되면 대기하고 있던 onMessage가 해당 메세지를 받아 처리
	 */
	@Override
	public void onMessage(Message message, byte[] pattern) {
		try {
			// redis에서 발행된 데이터를 받아 deserialize
			String publishMessage = redisTemplate.getStringSerializer().deserialize(message.getBody());
			// 입장 메세지 응답
			if (publishMessage.contains("enterMemberId")) {
				Entry entry = objectMapper.readValue(publishMessage, Entry.class);
				log.info("entry : {}, {}", entry.getChatroomId(), entry.getEnterMemberId());
				eventPublisher.publishEvent(new MessageReceivedEvent(this, entry));
				return;
			}
			// 메세지 응답
			MessageDto roomMessage = objectMapper.readValue(publishMessage, MessageDto.class);
			log.info("MessageSubscriber : {}", roomMessage.getContent());
			eventPublisher.publishEvent(new MessageReceivedEvent(this, roomMessage));

			// Send Notification
			if (isAnyoneInChatRoom(roomMessage.getChatroomId())) {
				return;
			}

			send(roomMessage);
			log.info("Notification senderId: {}", roomMessage.getSenderId());

		} catch (Exception e) {
			log.error(e.getMessage());
		}
	}

	public boolean isAnyoneInChatRoom(Long chatRoomId) {
		return chatRoomSessionRepository.findByChatRoomId(chatRoomId).size() == 2;
	}

	private void send(MessageDto messageDto) {
		ChatRoom chatRoom = chatRoomRepository.findChatroomFetchById(messageDto.getChatroomId())
			.orElseThrow(() -> new CustomException(StatusCode.NOT_FOUND_CHATROOM));
		User sender = userRepository.findById(messageDto.getSenderId())
			.orElseThrow(() -> new CustomException(StatusCode.NOT_FOUND_USER));
		User receiver = chatRoom.getReceiver(sender);

		Notification notification = Notification.create(chatRoom.getId(), chatRoom.getProduct().getTitle(),
			sender.getNickName(),
			messageDto.getContent());

		notificationService.send(receiver, notification);
	}

}
