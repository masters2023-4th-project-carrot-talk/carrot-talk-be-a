package com.example.carrot.chat_room.entity;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import com.example.carrot.chat_message.entity.ChatMessage;
import com.example.carrot.global.common.BaseCreatedTimeEntity;
import com.example.carrot.product.entity.Product;
import com.example.carrot.user.entity.User;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Entity
@Slf4j
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class ChatRoom extends BaseCreatedTimeEntity implements Serializable {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "buyer_id")
	private User user;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "product_id")
	private Product product;

	@OneToMany(mappedBy = "chatRoom", cascade = CascadeType.ALL)
	private List<ChatMessage> chatMessages = new ArrayList<>();

	@Builder
	public ChatRoom(User user, Product product) {
		this.user = user;
		this.product = product;
	}

	public static ChatRoom create(User user, Product product) {
		return ChatRoom.builder()
			.user(user)
			.product(product)
			.build();
	}

	public User getReceiver(User sender) {
		User seller = product.getUser();
		if (seller.getUserId().equals(sender.getUserId())) {
			log.info("getReceiver -> receiver 들어옴!");
			return this.user;
		}

		return seller;
	}

	public void addChatMessages(ChatMessage chatMessage) {
		this.chatMessages.add(chatMessage);
	}
}
