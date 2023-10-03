package com.example.carrot.chat_message.repository;

import static com.example.carrot.chat_message.entity.QChatMessage.*;

import java.util.List;

import javax.persistence.EntityManager;

import com.example.carrot.chat_room.dto.response.ChatMessageResponseDto;
import com.querydsl.core.types.Predicate;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;

public class QueryChatMessageRepositoryImpl implements QueryChatMessageRepository {

	private final JPAQueryFactory queryFactory;

	public QueryChatMessageRepositoryImpl(EntityManager em) {
		this.queryFactory = new JPAQueryFactory(em);
	}

	@Override
	public List<ChatMessageResponseDto> findChatMessages(Long userId, Long chatroomId, Long nextId, int defaultSize) {
		List<ChatMessageResponseDto> results = queryFactory
			.select(Projections.constructor(ChatMessageResponseDto.class,
				chatMessage.id,
				chatMessage.content,
				chatMessage.user.userId,
				chatMessage.isRead,
				chatMessage.createdAt
			))
			.from(chatMessage)
			.where(
				chatMessage.chatRoom.id.eq(chatroomId),
				chatMessageLessThen(nextId)
			)
			.orderBy(chatMessage.createdAt.desc())
			.limit(defaultSize + 1)
			.fetch();

		return results;
	}

	private Predicate chatMessageLessThen(Long nextId) {
		if (nextId == null) {
			return null;
		}
		return chatMessage.id.loe(nextId);
	}
}
