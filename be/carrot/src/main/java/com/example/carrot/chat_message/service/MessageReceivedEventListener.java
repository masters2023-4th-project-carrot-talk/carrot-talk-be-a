package com.example.carrot.chat_message.service;

import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;

import com.example.carrot.chat_message.dto.Entry;
import com.example.carrot.chat_message.dto.MessageDto;

@Component
public class MessageReceivedEventListener {

	private final SimpMessagingTemplate simpMessagingTemplate;

	public MessageReceivedEventListener(SimpMessagingTemplate simpMessagingTemplate) {
		this.simpMessagingTemplate = simpMessagingTemplate;
	}

	@EventListener
	public void handle(MessageReceivedEvent event) {
		Object content = event.getContent();
		if (content instanceof Entry) {
			Entry entry = (Entry)content;
			simpMessagingTemplate.convertAndSend("/subscribe/" + entry.getChatroomId(), entry);
		}
		if (content instanceof MessageDto) {
			MessageDto messageDto = (MessageDto)content;
			messageDto.setChatTime();
			simpMessagingTemplate.convertAndSend("/subscribe/" + messageDto.getChatroomId(), messageDto);
		}
	}
}