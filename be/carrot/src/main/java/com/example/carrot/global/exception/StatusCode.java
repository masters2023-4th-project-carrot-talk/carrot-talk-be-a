package com.example.carrot.global.exception;

import org.springframework.http.HttpStatus;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.security.SignatureException;
import lombok.Getter;

@Getter
public enum StatusCode {

	// -- [JWT] -- //
	NOT_FOUND_REFRESH_TOKEN(HttpStatus.BAD_REQUEST, "해당하는 리프레시 토큰을 찾을 수 없습니다."),
	MALFORMED_JWT_EXCEPTION(HttpStatus.UNAUTHORIZED, "잘못된 형식의 토큰입니다."),
	EXPIRED_JWT_EXCEPTION(HttpStatus.UNAUTHORIZED, "만료된 토큰입니다."),
	SIGNATURE_EXCEPTION(HttpStatus.UNAUTHORIZED, "JWT의 서명이 올바르지 않습니다."),
	UNSUPPORTED_JWT_EXCEPTION(HttpStatus.UNAUTHORIZED, "지원하지 않는 토큰입니다."),
	ILLEGAL_ARGUMENT_EXCEPTION(HttpStatus.UNAUTHORIZED, "잘못된 인자입니다."),

	// -- [USER] -- //
	ALREADY_EXIST_USER(HttpStatus.BAD_REQUEST, "같은 닉네임이 존재합니다."),
	NOT_FOUND_USER(HttpStatus.NOT_FOUND, "유저를 찾을 수 없습니다."),

	// -- [LOCATION] -- //
	NOT_FOUND_LOCATION(HttpStatus.BAD_REQUEST, "존재하지 않는 Location입니다.");

	private HttpStatus status;
	private String message;

	StatusCode(HttpStatus status, String message) {
		this.status = status;
		this.message = message;
	}

	public static StatusCode from(RuntimeException e) {
		if (e instanceof MalformedJwtException) {
			return StatusCode.MALFORMED_JWT_EXCEPTION;
		}
		if (e instanceof ExpiredJwtException) {
			return StatusCode.EXPIRED_JWT_EXCEPTION;
		}
		if (e instanceof SignatureException) {
			return StatusCode.SIGNATURE_EXCEPTION;
		}
		if (e instanceof UnsupportedJwtException) {
			return StatusCode.UNSUPPORTED_JWT_EXCEPTION;
		}
		return StatusCode.ILLEGAL_ARGUMENT_EXCEPTION;
	}
}
