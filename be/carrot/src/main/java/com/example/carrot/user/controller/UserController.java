package com.example.carrot.user.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.carrot.global.common.ApiResponse;
import com.example.carrot.user.dto.request.SignUpRequestDto;
import com.example.carrot.user.dto.response.UserNicknameResponseDto;
import com.example.carrot.user.dto.response.UserResponseDto;
import com.example.carrot.user.service.UserService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class UserController {

	private final UserService userService;

	/**
	 * OAuth 로그인 API
	 */
	@GetMapping("/users/login")
	public ApiResponse<UserResponseDto> kakaoLogin(@RequestParam String code) {
		UserResponseDto loginResponseDto = userService.kakaoLogin(code);
		return ApiResponse.success(loginResponseDto);
	}

	@GetMapping("/users")
	public ApiResponse<UserNicknameResponseDto> checkNickname(@RequestParam String nickname,
		HttpServletRequest request) {
		Long userId = Long.parseLong(String.valueOf(request.getAttribute("userId")));
		return ApiResponse.success(userService.checkNickNameDuplicate(nickname, userId));
	}

	@PostMapping("/users/signup")
	public ApiResponse<UserResponseDto> kakaoSignUp(@RequestBody SignUpRequestDto signUpRequestDto,
		HttpServletRequest request) {
		String socialId = String.valueOf(request.getAttribute("socialId"));
		String imgUrl = String.valueOf(request.getAttribute("imgUrl"));

		log.info("socialId : " + socialId);
		log.info("imgUrl : " + imgUrl);
		UserResponseDto userResponseDto = userService.kakaoSignUp(signUpRequestDto, socialId, imgUrl);
		return ApiResponse.success(userResponseDto);
	}

}
