package com.example.carrot.global.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.ChannelRegistration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

import com.example.carrot.global.interceptor.StompHandler;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Configuration
@EnableWebSocketMessageBroker
@RequiredArgsConstructor
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

	private final StompHandler stompHandler;

	@Override
	public void configureMessageBroker(MessageBrokerRegistry registry) {
		// /publish 으로 접근하는 메시지만 핸들러로 라우팅
		registry.setApplicationDestinationPrefixes("/publish");
		// 메모리 기반 메시지 브로커가 /subscribe 접두사가 붙은 클라이언트로 메시지를 전달할 수 있도록 설정
		registry.enableSimpleBroker("/subscribe");
	}

	@Override
	public void registerStompEndpoints(StompEndpointRegistry registry) {
		// 클라이언트에서 websocket에 접속하기 위한 endpoint 등록
		registry
			.addEndpoint("/chat")
			.setAllowedOrigins("*");
	}

	@Override
	public void configureClientInboundChannel(ChannelRegistration registration) {
		log.info("interceptor 진입");
		registration.interceptors(stompHandler);
	}
}
