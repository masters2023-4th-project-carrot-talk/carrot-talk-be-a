package com.example.carrot.chat_message.service.message;

import org.springframework.context.ApplicationEventPublisher;
import org.springframework.data.redis.connection.Message;
import org.springframework.data.redis.connection.MessageListener;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import com.example.carrot.chat_message.dto.Entry;
import com.example.carrot.chat_message.dto.MessageDto;
import com.example.carrot.chat_message.service.MessageReceivedEvent;
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

	/**
	 * Redis에서 메세지가 발행(publish)되면 대기하고 있던 onMessage가 해당 메세지를 받아 처리
	 */
	@Override
	public void onMessage(Message message, byte[] pattern) {
		try {
			// redis에서 발행된 데이터를 받아 deserialize
			String publishMessage = redisTemplate.getStringSerializer().deserialize(message.getBody());
			// 입장 메세지 응답
			if (publishMessage.contains("anyoneEnterRoom")) {
				Entry entry = objectMapper.readValue(publishMessage, Entry.class);
				log.info("entry : {}, {}", entry.getChatroomId(), entry.isAnyoneEnterRoom());
				eventPublisher.publishEvent(new MessageReceivedEvent(this, entry));
				return;
			}
			// 메세지 응답
			MessageDto roomMessage = objectMapper.readValue(publishMessage, MessageDto.class);
			log.info("MessageSubscriber : {}", roomMessage.getContent());
			eventPublisher.publishEvent(new MessageReceivedEvent(this, roomMessage));
		} catch (Exception e) {
			log.error(e.getMessage());
		}
	}
}
