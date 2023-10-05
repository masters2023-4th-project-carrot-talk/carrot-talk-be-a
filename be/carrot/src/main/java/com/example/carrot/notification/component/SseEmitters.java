package com.example.carrot.notification.component;

import java.io.IOException;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import com.example.carrot.global.exception.CustomException;
import com.example.carrot.global.exception.StatusCode;
import com.example.carrot.notification.entity.Notification;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@Component
public class SseEmitters {

	private static final String EVENT_NAME_CONNECTED = "connected";
	private static final String EVENT_NAME_NOTIFICATION = "notification";

	private final Map<Long, SseEmitter> userSseEmitterMap = new ConcurrentHashMap<>();

	@Value("${sse.timeout}")
	private long emitterTimeout;

	public SseEmitter add(Long userId) {
		SseEmitter emitter = new SseEmitter(emitterTimeout);
		userSseEmitterMap.put(userId, emitter);

		return sendNotification(userId, EVENT_NAME_CONNECTED);
	}

	public void sendNotification(Long receiverId, Notification notification) {
		sendNotification(receiverId, notification.toString());
	}

	private SseEmitter sendNotification(Long receiverId, String notificationData) {
		SseEmitter emitter = userSseEmitterMap.get(receiverId);

		try {
			emitter.send(SseEmitter.event()
				.id(String.valueOf(receiverId))
				.name(EVENT_NAME_NOTIFICATION)
				.data(notificationData));

			return emitter;
		} catch (IOException e) {
			emitter.completeWithError(new CustomException(StatusCode.SEND_SSE_EMITTER_ERROR));
		}
	}
}
