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

	private String title;
	private String content;

	public static Notification create(String title, String sender, String content) {
		return new Notification(title, sender + ": " + content);
	}

}
