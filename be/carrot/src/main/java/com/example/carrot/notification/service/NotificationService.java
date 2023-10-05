package com.example.carrot.notification.service;

import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import com.example.carrot.notification.component.SseEmitters;
import com.example.carrot.notification.entity.Notification;
import com.example.carrot.user.entity.User;
import com.example.carrot.user.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class NotificationService {

	private final UserRepository userRepository;
	private final SseEmitters sseEmitters;

	public SseEmitter subscribe(Long userId) {
		return sseEmitters.add(userId);
	}

	public void send(User receiver, Notification notification) {
		sseEmitters.sendNotification(receiver.getUserId(), notification);
	}

}
