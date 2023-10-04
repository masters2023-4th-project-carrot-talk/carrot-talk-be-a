package com.example.carrot.global.exception;

import org.springframework.http.HttpStatus;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum StatusCode {

	// -- [JWT] -- //
	NOT_FOUND_REFRESH_TOKEN(HttpStatus.BAD_REQUEST, "해당하는 리프레시 토큰을 찾을 수 없습니다."),
	MALFORMED_JWT_EXCEPTION(HttpStatus.UNAUTHORIZED, "잘못된 형식의 토큰입니다."),
	EXPIRED_JWT_EXCEPTION(HttpStatus.UNAUTHORIZED, "만료된 토큰입니다."),
	SIGNATURE_EXCEPTION(HttpStatus.UNAUTHORIZED, "JWT의 서명이 올바르지 않습니다."),
	UNSUPPORTED_JWT_EXCEPTION(HttpStatus.UNAUTHORIZED, "지원하지 않는 토큰입니다."),
	ILLEGAL_ARGUMENT_EXCEPTION(HttpStatus.UNAUTHORIZED, "잘못된 인자입니다."),
	UNKNOWN_EXCEPTION(HttpStatus.UNAUTHORIZED, "알 수 없는 오류가 발생했습니다."),

	// -- [USER] -- //
	ALREADY_EXIST_USER(HttpStatus.CONFLICT, "같은 닉네임이 존재합니다."),
	NOT_FOUND_USER(HttpStatus.NOT_FOUND, "유저를 찾을 수 없습니다."),

	// -- [LOCATION] -- //
	NOT_FOUND_SAME_LOCATION(HttpStatus.BAD_REQUEST, "같은 Location을 찾을 수 없습니다."),
	NOT_FOUND_MAIN_LOCATION(HttpStatus.BAD_REQUEST, "Main Location을 찾을 수 없습니다."),
	DELETE_LOCATION_EXCEPTION(HttpStatus.BAD_REQUEST, "동네가 하나이므로 삭제할 수 없습니다."),
	NOT_FOUND_LOCATION(HttpStatus.BAD_REQUEST, "해당하는 동네를 찾을 수 없습니다."),
	NOT_MAIN_LOCATION(HttpStatus.NOT_FOUND, "대표 동네가 아닙니다."),

	// -- [CATEGORY] -- //
	NOT_FOUND_CATEGORY(HttpStatus.NOT_FOUND, "카테고리를 조회할 수 없습니다."),
	NOT_FOUND_CATEGORIES(HttpStatus.NOT_FOUND, "카테고리 목록을 조회할 수 없습니다."),

	// -- [PRODUCT] -- //
	NOT_FOUND_PRODUCT(HttpStatus.NOT_FOUND, "해당하는 상품을 찾을 수 없습니다."),
	NO_EDIT_PERMISSION(HttpStatus.FORBIDDEN, "수정할 권한이 없습니다."),
	INVALID_PRODUCT_STATUS(HttpStatus.BAD_REQUEST, "유효하지 않은 상태입니다."),

	// -- [IMAGE] -- //
	NOT_IMAGE(HttpStatus.BAD_REQUEST, "이미지 형식이 아닙니다."),
	UPLOAD_IMAGE_EXCEPTION(HttpStatus.BAD_REQUEST, "이미지 업로드에 실패했습니다."),
	NOT_FOUND_IMAGE(HttpStatus.NOT_FOUND, "해당하는 이미지가 없습니다."),
	NOT_FOUND_MAIN_IMAGE(HttpStatus.NOT_FOUND, "메인 이미지를 찾을 수 없습니다."),

	// -- [CHAT] -- //
	NOT_FOUND_CHATROOM(HttpStatus.NOT_FOUND, "해당하는 채팅방이 없습니다."),
	ACCESS_DENIED_CHATROOM(HttpStatus.FORBIDDEN, "해당 채팅방에 접근할 수 없습니다."),

	// -- [SSE] -- //
	SEND_SSE_EMITTER_ERROR(HttpStatus.BAD_REQUEST, "Sse Emitter를 보내는 도중 에러가 발생했습니다.");

	private final HttpStatus status;
	private final String message;

}
