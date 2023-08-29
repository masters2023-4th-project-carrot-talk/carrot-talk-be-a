package com.example.carrot.global.exception;

import org.springframework.http.HttpStatus;

import lombok.Getter;

@Getter
public enum StatusCode {
	// -- [USER] -- //
	ALREADY_EXIST_USER(HttpStatus.BAD_REQUEST, "같은 아이디가 존재합니다.");

	private HttpStatus status;
	private String message;

	StatusCode(HttpStatus status, String message) {
		this.status = status;
		this.message = message;
	}
}
