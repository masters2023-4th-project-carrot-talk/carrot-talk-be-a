package com.example.carrot.notification.component;

import java.io.IOException;
import java.io.InputStream;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;

import com.example.carrot.global.exception.CustomException;
import com.example.carrot.global.exception.StatusCode;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
public class FCMInitializer {

	@Value("${fcm.certification}")
	private String googleApplicationCredentials;

	@PostConstruct
	public void initialize() throws IOException {
		ClassPathResource resource = new ClassPathResource(googleApplicationCredentials);

		try (InputStream inputStream = resource.getInputStream()) {
			// 로그인 시, FCM 토큰을 받아 데이터베이스에 저장
			FirebaseOptions options = FirebaseOptions.builder()
				.setCredentials(GoogleCredentials.fromStream(inputStream))
				.build();

			// 로그아웃 시, 데이터베이스 내의 토큰 제거
			// 만약 로그아웃 시에 토큰을 데이터베이스에 남겨둔다면,
			// 이미 로그아웃된 디바이스에서 유저 관련 메시지를 수신할 수도 있기 때문에 제거해야 함
			if (FirebaseApp.getApps().isEmpty()) {
				FirebaseApp.initializeApp(options);
				log.info("FirebaseApp initialization complete");
			}
		} catch (Exception e) {
			log.info("FCM 초기화 중 문제 발생: {}", e.getMessage());
			throw new CustomException(StatusCode.NOT_FOUND_FCM);
		}
	}
}
