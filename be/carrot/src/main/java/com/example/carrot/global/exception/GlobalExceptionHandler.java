package com.example.carrot.global.exception;

import java.util.HashMap;
import java.util.Map;

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

	@ResponseStatus(HttpStatus.BAD_REQUEST)
	@ExceptionHandler(BindException.class)
	public ApiResponse<Object> handleBindException(BindException e) {
		log.debug("BindException handling : {}", e.toString());

		return ApiResponse.fail(
			e.getBindingResult().getFieldErrors().stream().map(
				error -> {
					Map<String, String> errors = new HashMap<>();
					errors.put("field", error.getField());
					errors.put("defaultMessage", error.getDefaultMessage());
					return errors;
				}
			));
	}

	@ResponseStatus(HttpStatus.BAD_REQUEST)
	@ExceptionHandler(CustomException.class)
	public ApiResponse<ErrorCode> handleCustomException(CustomException e) {
		StatusCode statusCode = e.getStatusCode();

		return ApiResponse.fail(new ErrorCode(statusCode.getStatus(), statusCode.getMessage()));
	}
}
