package com.example.carrot.user.service;

import static org.assertj.core.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase.*;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;

import com.example.carrot.global.exception.CustomException;
import com.example.carrot.global.exception.StatusCode;
import com.example.carrot.global.jwt.JwtProvider;
import com.example.carrot.location.entity.Location;
import com.example.carrot.location.repository.LocationRepository;
import com.example.carrot.location.service.LocationService;
import com.example.carrot.user.dto.request.LogoutRequestDto;
import com.example.carrot.user.dto.request.ReissueRequestDto;
import com.example.carrot.user.dto.request.SignUpRequestDto;
import com.example.carrot.user.dto.response.ReissueResponseDto;
import com.example.carrot.user.dto.response.UserResponseDto;
import com.example.carrot.user.entity.User;
import com.example.carrot.user.repository.UserRepository;
import com.example.carrot.user_location.service.UserLocationService;

@AutoConfigureTestDatabase(replace = Replace.NONE)
@ActiveProfiles("test")
@SpringBootTest
@Transactional
class UserServiceTest {

	Log log = LogFactory.getLog(UserServiceTest.class);

	@Autowired
	private UserService userService;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private LocationService locationService;

	@Autowired
	private LocationRepository locationRepository;

	@Autowired
	private UserLocationService userLocationService;

	@Autowired
	private JwtProvider jwtProvider;

	@DisplayName("사용자 회원가입을 한다.")
	@Test
	public void kakaoSignup() throws Exception {
		//given
		Location location1 = createLocation("역삼 1동");
		Location location2 = createLocation("역삼 2동");
		String socialId = "123";
		String imgUrl = "image.com";

		SignUpRequestDto request = SignUpRequestDto.builder()
			.mainLocationId(location1.getLocationId())
			.subLocationId(location2.getLocationId())
			.nickname("testNickname1")
			.build();

		//when
		UserResponseDto response = userService.kakaoSignUp(request, socialId, imgUrl);

		//then
		assertThat(response.getLoginUserResponseDto())
			.extracting("nickname", "imageUrl")
			.contains("testNickname1", "image.com");
	}

	@DisplayName("이미 존재하는 닉네임이면 예외처리한다.")
	@Test
	public void checkNickNameDuplicate() throws Exception {
		//given
		String targetNickname = "testNickname";
		User user = createUser(targetNickname, "image.com", "1", "123");
		userRepository.save(user);

		//when //then
		assertThatThrownBy(() -> userService.checkNickNameDuplicate(targetNickname))
			.isExactlyInstanceOf(CustomException.class)
			.satisfies(exception -> {
				CustomException customException = (CustomException)exception;
				assertThat(customException.getStatusCode()).isEqualTo(StatusCode.ALREADY_EXIST_USER);
			});
	}

	@DisplayName("refresh token으로 access token을 재발급 한다.")
	@Test
	public void reissueToken() throws Exception {
		//given
		User user = createUser("testNickName", "image.com", "1", "123");
		User savedUser = userRepository.save(user);

		ReissueRequestDto request = new ReissueRequestDto("123");

		//when
		ReissueResponseDto result = userService.reissueToken(request);
		Long userId = Long.valueOf(String.valueOf(jwtProvider.getClaims(result.getAccessToken()).get("userId")));

		//then
		assertThat(savedUser.getUserId()).isEqualTo(userId);
	}

	@DisplayName("userId와 refresh token으로 로그아웃을 한다.")
	@Test
	public void kakaoLogout() throws Exception {
		//given
		User user = createUser("testNickName", "image.com", "1", "123");
		User savedUser = userRepository.saveAndFlush(user);

		LogoutRequestDto request = new LogoutRequestDto(savedUser.getRefreshToken());
		Long userId = savedUser.getUserId();

		//when
		int updatedCount = userService.kakaoLogout(request, userId);

		//then
		assertTrue(updatedCount > 0);
	}

	private Location createLocation(String name) {
		Location location = new Location(name);
		return locationRepository.save(location);
	}

	private User createUser(String name, String imageUrl, String socialNum, String refreshToken) {
		return User.builder()
			.nickName(name)
			.imageUrl(imageUrl)
			.socialId(socialNum)
			.refreshToken(refreshToken)
			.build();
	}
}