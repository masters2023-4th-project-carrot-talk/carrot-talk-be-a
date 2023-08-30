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

	public static <T> ApiResponse<T> success(boolean success) {
		return (ApiResponse<T>)ApiResponse.builder()
			.success(success)
			.build();
	}

	public static <T> ApiResponse<T> success(boolean success, T data) {
		return (ApiResponse<T>) ApiResponse.builder()
			.success(success)
			.data(data)
			.build();
	}

	public static <T> ApiResponse<T> fail(boolean success, T errorCode) {
		return (ApiResponse<T>) ApiResponse.builder()
			.success(success)
			.errorCode(errorCode)
			.build();
	}

}