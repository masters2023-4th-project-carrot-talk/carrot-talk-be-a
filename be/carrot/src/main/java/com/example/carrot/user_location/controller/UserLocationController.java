package com.example.carrot.user_location.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.carrot.global.common.ApiResponse;
import com.example.carrot.location.dto.request.MainLocationRequestDto;
import com.example.carrot.location.dto.response.MainLocationResponseDto;
import com.example.carrot.user_location.dto.response.ReadUserLocationResponseDto;
import com.example.carrot.user_location.service.UserLocationService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
@Slf4j
public class UserLocationController {

	private final UserLocationService userLocationService;

	@GetMapping("/users/locations")
	public ApiResponse<List<ReadUserLocationResponseDto>> getUserLocation(@RequestAttribute(required = false) Long userId) {
		if (userId == null) {
			return ApiResponse.success(ReadUserLocationResponseDto.defaultLocation());
		}

		// TODO: 로그인한 상태니 자신의 등록된 동네 불러오도록
		return ApiResponse.success(userLocationService.getUserLocation(userId));
	}

	@PatchMapping("/users/locations")
	public ApiResponse<MainLocationResponseDto> registerMainLocation(
		@Valid @RequestBody MainLocationRequestDto mainLocationRequestDto, @RequestAttribute Long userId) {
		MainLocationResponseDto mainLocationResponseDto = userLocationService.registerMainLocation(
			mainLocationRequestDto, userId);
		return ApiResponse.success(mainLocationResponseDto);
	}
}
