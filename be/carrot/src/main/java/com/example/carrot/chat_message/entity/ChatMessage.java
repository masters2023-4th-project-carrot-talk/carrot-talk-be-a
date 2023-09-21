package com.example.carrot.chat_message.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.example.carrot.chat_room.entity.ChatRoom;
import com.example.carrot.global.common.BaseCreatedTimeEntity;
import com.example.carrot.user.entity.User;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class ChatMessage extends BaseCreatedTimeEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(nullable = false, length = 500)
	private String content;

	@Column(nullable = false, columnDefinition = "boolean default false")
	private boolean isRead;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "chatroom_id")
	private ChatRoom chatRoom;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "sender_id")
	private User user;

	@Builder
	public ChatMessage(String content, ChatRoom chatRoom, User user) {
		this.content = content;
		this.chatRoom = chatRoom;
		this.user = user;
		this.isRead = false;
	}
}
