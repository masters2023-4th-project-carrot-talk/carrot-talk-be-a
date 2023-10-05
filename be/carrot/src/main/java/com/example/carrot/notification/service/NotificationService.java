package com.example.carrot.notification.service;

import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import com.example.carrot.notification.component.SseEmitters;
import com.example.carrot.notification.entity.Notification;
import com.example.carrot.user.entity.User;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RequiredArgsConstructor
@Service
@Slf4j
public class NotificationService {

	private final SseEmitters sseEmitters;

	public SseEmitter subscribe(Long userId) {
		log.info("NotificationService subscribe 메서드 진입");
		return sseEmitters.add(userId);
	}

	public void send(User receiver, Notification notification) {
		log.info("NotificationService send 메서드 진입");
		sseEmitters.sendNotification(receiver.getUserId(), notification);
	}

}
