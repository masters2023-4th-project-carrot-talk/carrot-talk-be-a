package com.example.carrot.chat_message.service;

import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.data.redis.listener.RedisMessageListenerContainer;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.carrot.chat_message.dto.Entry;
import com.example.carrot.chat_message.dto.MessageDto;
import com.example.carrot.chat_message.entity.ChatMessage;
import com.example.carrot.chat_message.repository.ChatMessageRepository;
import com.example.carrot.chat_message.service.message.MessagePublisher;
import com.example.carrot.chat_message.service.message.MessageSubscriber;
import com.example.carrot.chat_room.entity.ChatRoom;
import com.example.carrot.chat_room.repository.ChatRoomRepository;
import com.example.carrot.chat_room.repository.ChatRoomSessionRepository;
import com.example.carrot.global.exception.CustomException;
import com.example.carrot.global.exception.StatusCode;
import com.example.carrot.user.entity.User;
import com.example.carrot.user.repository.UserRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class ChatMessageService {

	private final MessageSubscriber messageSubscriber;
	private final MessagePublisher messagePublisher;

	private final ChatMessageRepository chatMessageRepository;
	private final ChatRoomRepository chatRoomRepository;
	private final UserRepository userRepository;
	private final ChatRoomSessionRepository chatRoomSessionRepository;

	private final RedisMessageListenerContainer redisMessageListener;

	public void sendMessage(MessageDto message) {
		if (isAnyoneInChatRoom(message.getChatroomId())) {
			message.readMessage();
		}

		messagePublisher.publish(new ChannelTopic(String.valueOf(message.getChatroomId())), message);
		ChatMessage chatMessage = ChatMessage.createChatMessage(
			getChatRoom(message.getChatroomId()),
			getUser(message.getSenderId()),
			message.getContent(),
			message.getIsRead()
		);
		chatMessageRepository.save(chatMessage);
	}

	private User getUser(Long senderId) {
		return userRepository.findById(senderId)
			.orElseThrow(() -> new CustomException(StatusCode.NOT_FOUND_USER));
	}

	private ChatRoom getChatRoom(Long chatroomId) {
		return chatRoomRepository.findById(chatroomId)
			.orElseThrow(() -> new CustomException(StatusCode.NOT_FOUND_CHATROOM));
	}

	public void sendEntry(Entry entry) {
		ChannelTopic topic = new ChannelTopic(String.valueOf(entry.getChatroomId()));
		messagePublisher.publish(topic, entry);
		redisMessageListener.addMessageListener(messageSubscriber, topic);
	}

	@Transactional
	public void readMessageCountByChatRoom(Long chatRoomId, Long userId) {
		chatMessageRepository.updateMessageByChatRoomIdAndUserId(chatRoomId, userId);
	}

	public boolean isAnyoneInChatRoom(Long chatRoomId) {
		return chatRoomSessionRepository.findByChatRoomId(chatRoomId).size() == 2;
	}
}
