package com.example.carrot.chat_message.service.message;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.stereotype.Service;

import com.example.carrot.chat_message.dto.Entry;
import com.example.carrot.chat_message.dto.MessageDto;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MessagePublisher {
	private final RedisTemplate<String, Object> redisTemplate;

	public void publish(ChannelTopic topic, Entry entry) {
		redisTemplate.convertAndSend(topic.getTopic(), entry);
	}

	public void publish(ChannelTopic topic, MessageDto message) {
		redisTemplate.convertAndSend(topic.getTopic(), message);
	}

}
