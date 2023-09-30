package com.example.carrot.chat_room.repository;

import static com.example.carrot.chat_message.entity.QChatMessage.*;
import static com.example.carrot.chat_room.entity.QChatRoom.*;
import static com.example.carrot.image.entity.QImage.*;
import static com.example.carrot.product.entity.QProduct.*;
import static com.example.carrot.product_image.entity.QProductImage.*;
import static com.example.carrot.user.entity.QUser.*;

import java.util.List;

import javax.persistence.EntityManager;

import com.example.carrot.chat_room.dto.response.ChatRoomOpponentDto;
import com.example.carrot.chat_room.dto.response.ChatRoomProductDto;
import com.example.carrot.chat_room.dto.response.ChatRoomResponseDto;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.core.types.dsl.NumberExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;

public class QueryChatRoomRepositoryImpl implements QueryChatRoomRepository {

	private final JPAQueryFactory queryFactory;

	public QueryChatRoomRepositoryImpl(EntityManager em) {
		this.queryFactory = new JPAQueryFactory(em);
	}

	@Override
	public List<ChatRoomResponseDto> findChatRoomsByUserId(Long userId) {
		return queryFactory
			.select(Projections.constructor(ChatRoomResponseDto.class,
				chatRoom.id,
				chatMessage.content.max(),
				chatMessage.createdAt.max(),
				getUnreadCount(userId),
				Projections.constructor(ChatRoomOpponentDto.class, user.userId, user.nickName, user.imageUrl),
				Projections.constructor(ChatRoomProductDto.class, product.productId, image.imageUrl)))
			.from(chatRoom)
			.leftJoin(chatRoom.chatMessages, chatMessage)
			.leftJoin(chatRoom.product, product)
			.leftJoin(product.productImages, productImage)
			.leftJoin(productImage.image, image)
			.leftJoin(chatMessage.user, user)
			.where(productImage.isMain.eq(true)
				.and(product.user.userId.eq(userId)
					.or(chatRoom.user.userId.eq(userId)))
				.and(user.userId.ne(userId)))
			.groupBy(chatRoom.id, user.userId, user.nickName, user.imageUrl, image.imageUrl)
			.orderBy(chatMessage.createdAt.max().desc())
			.fetch();
	}

	private NumberExpression<Integer> getUnreadCount(Long userId) {
		return Expressions.cases()
			.when(chatMessage.isRead.eq(false)
				.and(chatMessage.user.userId.ne(userId)))
			.then(1)
			.otherwise(0)
			.sum();
	}
}
