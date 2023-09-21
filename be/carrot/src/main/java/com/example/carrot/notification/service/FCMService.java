package com.example.carrot.notification.service;

import org.springframework.stereotype.Service;

import com.example.carrot.notification.dao.FCMTokenDao;
import com.example.carrot.user.dto.response.UserResponseDto;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class FCMService {

	private final FCMTokenDao fcmTokenDao;

	public void saveToken(UserResponseDto userResponseDto) {
		String userId = userResponseDto.getLoginUserResponseDto().getId().toString();
		fcmTokenDao.saveToken(userId);
	}

	public void deleteToken(String userId) {
		fcmTokenDao.deleteToken(userId);
	}

	private boolean hasKey(String userId) {
		return fcmTokenDao.hasKey(userId);
	}

	private String getToken(String userId) {
		return fcmTokenDao.getToken(userId);
	}

}
