package com.example.carrot.notification.dao;

import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Repository;

import com.example.carrot.global.exception.CustomException;
import com.example.carrot.global.exception.StatusCode;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Repository
public class FCMTokenDao {

	private final StringRedisTemplate tokenRedisTemplate;

	public void saveToken(String token, String userId) {
		if (!hasKey(userId)) {
			throw new CustomException(StatusCode.ALREADY_EXIST_USER);
		}

		tokenRedisTemplate.opsForValue()
			.set(userId, token);
	}

	public String getToken(String userId) {
		return tokenRedisTemplate.opsForValue().get(userId);
	}

	public void deleteToken(String userId) {
		tokenRedisTemplate.delete(userId);
	}

	public boolean hasKey(String userId) {
		return Boolean.TRUE.equals(tokenRedisTemplate.hasKey(userId));
	}
}
