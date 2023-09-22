package com.example.carrot.notification.service;

import org.springframework.stereotype.Service;

import com.example.carrot.notification.dao.FCMTokenDao;
import com.example.carrot.user.dto.request.LoginRequestDto;
import com.example.carrot.user.dto.response.UserResponseDto;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class FCMService {

	private final FCMTokenDao fcmTokenDao;

	public void saveToken(LoginRequestDto loginRequestDto, UserResponseDto userResponseDto) {
		String userId = userResponseDto.getLoginUserResponseDto().getId().toString();
		String token = loginRequestDto.getToken();
		fcmTokenDao.saveToken(token, userId);
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
