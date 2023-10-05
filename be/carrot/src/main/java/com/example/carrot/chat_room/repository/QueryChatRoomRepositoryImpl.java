package com.example.carrot.chat_room.repository;

import static com.example.carrot.chat_message.entity.QChatMessage.*;
import static com.example.carrot.chat_room.entity.QChatRoom.*;
import static com.example.carrot.image.entity.QImage.*;
import static com.example.carrot.product.entity.QProduct.*;
import static com.example.carrot.product_image.entity.QProductImage.*;

import java.util.List;

import javax.persistence.EntityManager;

import com.example.carrot.chat_room.dto.response.ChatRoomInfoResponseDto;
import com.example.carrot.chat_room.dto.response.ChatRoomOpponentDto;
import com.example.carrot.chat_room.dto.response.ChatRoomOpponentInfoDto;
import com.example.carrot.chat_room.dto.response.ChatRoomProductDto;
import com.example.carrot.chat_room.dto.response.ChatRoomProductInfoDto;
import com.example.carrot.chat_room.dto.response.ChatRoomResponseDto;
import com.example.carrot.user.entity.QUser;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.core.types.dsl.NumberExpression;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class QueryChatRoomRepositoryImpl implements QueryChatRoomRepository {

	private final JPAQueryFactory queryFactory;

	public QueryChatRoomRepositoryImpl(EntityManager em) {
		this.queryFactory = new JPAQueryFactory(em);
	}

	@Override
	public List<ChatRoomResponseDto> findChatRoomsByUserId(Long userId) {

		QUser opponentUser = new QUser("opponentUser");  // 상대방 정의

		BooleanExpression userIsProductUser = chatRoom.product.user.userId.eq(userId);
		BooleanExpression userIsChatRoomUser = chatRoom.user.userId.eq(userId);

		BooleanExpression opponentIsProductUser = opponentUser.userId.eq(chatRoom.product.user.userId)
			.and(userIsChatRoomUser);
		BooleanExpression opponentIsChatRoomUser = opponentUser.userId.eq(chatRoom.user.userId).and(userIsProductUser);

		return queryFactory
			.select(Projections.constructor(ChatRoomResponseDto.class,
				chatRoom.id,
				chatMessage.content,
				chatMessage.createdAt,
				getUnreadCount(userId),
				Projections.constructor(ChatRoomOpponentDto.class, opponentUser.userId, opponentUser.nickName,
					opponentUser.imageUrl),
				Projections.constructor(ChatRoomProductDto.class, product.productId, image.imageUrl)))
			.from(chatRoom)
			.leftJoin(chatRoom.chatMessages, chatMessage)
			.leftJoin(chatRoom.product, product)
			.leftJoin(product.productImages, productImage)
			.leftJoin(productImage.image, image)
			.leftJoin(opponentUser).on(opponentIsProductUser.or(opponentIsChatRoomUser)) // 조건에 따른 상대방 조인
			.where(productImage.isMain.eq(true)
				.and(userIsProductUser.or(userIsChatRoomUser))
				.and(chatMessage.createdAt.eq(
					JPAExpressions.select(chatMessage.createdAt.max())
						.from(chatMessage)
						.where(chatMessage.chatRoom.id.eq(chatRoom.id))
				)))
			.groupBy(chatRoom.id, opponentUser.userId, opponentUser.nickName, opponentUser.imageUrl, image.imageUrl,
				chatMessage.content,
				chatMessage.createdAt)
			.orderBy(chatMessage.createdAt.desc())
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

	@Override
	public ChatRoomInfoResponseDto findOpponentAndProduct(Long userId, Long chatroomId) {
		QUser productUser = new QUser("productUser");
		QUser chatRoomUser = new QUser("chatRoomUser");
		QUser opponentUser = new QUser("opponentUser");

		BooleanExpression isProductUser = productUser.userId.eq(userId);
		BooleanExpression isChatRoomUser = chatRoomUser.userId.eq(userId);
		BooleanExpression opponentIsProductUser = opponentUser.userId.eq(productUser.userId).and(isChatRoomUser);
		BooleanExpression opponentIsChatRoomUser = opponentUser.userId.eq(chatRoomUser.userId).and(isProductUser);

		return queryFactory
			.select(Projections.constructor(ChatRoomInfoResponseDto.class,
				Projections.constructor(ChatRoomOpponentInfoDto.class,
					opponentUser.userId, opponentUser.nickName),
				Projections.constructor(ChatRoomProductInfoDto.class,
					product.productId, product.title, product.price, image.imageUrl)))
			.from(chatRoom)
			.leftJoin(chatRoom.user, chatRoomUser)
			.leftJoin(chatRoom.product, product)
			.leftJoin(product.user, productUser)
			.leftJoin(product.productImages, productImage)
			.leftJoin(productImage.image, image)
			.leftJoin(opponentUser).on(opponentIsProductUser.or(opponentIsChatRoomUser))
			.where(productImage.isMain.isTrue())
			.where(chatRoom.id.eq(chatroomId))
			.groupBy(chatRoom.id, image.imageUrl)
			.fetchOne();
	}

}
