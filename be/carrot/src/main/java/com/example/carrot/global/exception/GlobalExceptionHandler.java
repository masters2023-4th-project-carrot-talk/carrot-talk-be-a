package com.example.carrot.global.exception;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import org.springframework.http.HttpStatus;
import org.springframework.validation.BindException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.example.carrot.global.common.ApiResponse;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

	@ExceptionHandler(BindException.class)
	public ApiResponse<ErrorCode> handleBindException(BindException e) {
		log.info("BindException : {}", e);

		String errorMessages = e.getBindingResult().getFieldErrors().stream()
			.map(error -> "Field: " + error.getField() + ", Message: " + error.getDefaultMessage())
			.collect(Collectors.joining("; "));

		return ApiResponse.fail(new ErrorCode(HttpStatus.BAD_REQUEST, errorMessages));
	}

	@ExceptionHandler(CustomException.class)
	public ApiResponse<ErrorCode> handleCustomException(CustomException e) {
		log.info("CustomException : {} ", e);
		StatusCode statusCode = e.getStatusCode();

		return ApiResponse.fail(new ErrorCode(statusCode.getStatus(), statusCode.getMessage()));
	}
}
