package com.example.carrot.chat_message.service;

import org.springframework.context.ApplicationEvent;

import lombok.Getter;

@Getter
public class MessageReceivedEvent extends ApplicationEvent {
	private final Object content;

	public MessageReceivedEvent(Object source, Object content) {
		super(source);
		this.content = content;
	}
}