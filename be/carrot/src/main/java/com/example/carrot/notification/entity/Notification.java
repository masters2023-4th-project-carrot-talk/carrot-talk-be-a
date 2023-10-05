package com.example.carrot.notification.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class Notification {

	private String chatroomId;
	private String title;
	private String content;

	public static Notification create(Long chatroomId, String title, String sender, String content) {
		return new Notification(String.valueOf(chatroomId), title, sender + ": " + content);
	}

}
