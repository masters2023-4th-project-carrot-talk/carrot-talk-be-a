package com.example.carrot.global.common;

import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.Builder;
import lombok.Getter;

@Getter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ApiResponse<T> {

	private boolean success;
	private T data;
	private T errorCode;

	@Builder
	public ApiResponse(boolean success, T data, T errorCode) {
		this.success = success;
		this.data = data;
		this.errorCode = errorCode;
	}

	public static <T> ApiResponse<T> success() {
		return (ApiResponse<T>)ApiResponse.builder()
			.success(true)
			.build();
	}

	public static <T> ApiResponse<T> success(T data) {
		return (ApiResponse<T>)ApiResponse.builder()
			.success(true)
			.data(data)
			.build();
	}

	public static <T> ApiResponse<T> fail(T errorCode) {
		return (ApiResponse<T>)ApiResponse.builder()
			.success(false)
			.errorCode(errorCode)
			.build();
	}

}
