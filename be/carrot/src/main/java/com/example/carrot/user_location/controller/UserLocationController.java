package com.example.carrot.user_location.controller;

import javax.validation.Valid;

import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.carrot.global.common.ApiResponse;
import com.example.carrot.location.dto.request.MainLocationRequestDto;
import com.example.carrot.location.dto.response.MainLocationResponseDto;
import com.example.carrot.user_location.service.UserLocationService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class UserLocationController {

	private final UserLocationService userLocationService;

	@PatchMapping("/users/locations")
	public ApiResponse<MainLocationResponseDto> registerMainLocation(
		@Valid @RequestBody MainLocationRequestDto mainLocationRequestDto, @RequestAttribute Long userId) {
		MainLocationResponseDto mainLocationResponseDto = userLocationService.registerMainLocation(
			mainLocationRequestDto, userId);
		return ApiResponse.success(mainLocationResponseDto);
	}
}
