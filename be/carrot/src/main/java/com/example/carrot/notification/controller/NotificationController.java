package com.example.carrot.notification.controller;

import javax.servlet.http.HttpServletResponse;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import com.example.carrot.notification.service.NotificationService;

import lombok.RequiredArgsConstructor;

@RequestMapping("/api/notification")
@RequiredArgsConstructor
@RestController
public class NotificationController {

	private final NotificationService notificationService;

	@GetMapping(value = "/subscribe", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
	public ResponseEntity<SseEmitter> connect(@RequestAttribute Long userId) {
		return ResponseEntity.ok()
			.header("X-Accel-Buffering", "no")
			.body(notificationService.subscribe(userId));
	}
}
