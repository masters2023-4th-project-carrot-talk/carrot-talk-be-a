package com.example.carrot.notification.controller;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.carrot.notification.service.NotificationService;

import lombok.RequiredArgsConstructor;

@RequestMapping("/api/notification")
@RequiredArgsConstructor
@RestController
public class NotificationController {

	private final NotificationService notificationService;

	@GetMapping(value = "/subscribe", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
	public ResponseEntity<Void> connect(@RequestAttribute Long userId) {
		notificationService.subscribe(userId);

		return ResponseEntity.ok()
			.header("X-Accel-Buffering", "no")
			.build();
	}
}
