package com.example.carrot.user.repository;

import static org.assertj.core.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase.*;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.ActiveProfiles;

import com.example.carrot.user.entity.User;

@AutoConfigureTestDatabase(replace = Replace.NONE)
@ActiveProfiles("test")
@DataJpaTest
class UserRepositoryTest {

	@Autowired
	private UserRepository userRepository;

	@DisplayName("social id로 user를 조회한다.")
	@Test
	public void findBySocialId() throws Exception {
		//given
		String targetSocialId = "1";
		User user = createUser("testNickName1", "image.com", targetSocialId, "123");
		userRepository.save(user);

		//when
		User findUser = userRepository.findBySocialId(targetSocialId).get();

		//then
		assertThat(findUser)
			.extracting("nickName", "imageUrl", "socialId")
			.contains("testNickName1", "image.com", targetSocialId);
	}

	@DisplayName("이미 존재하는 닉네임이면 true를 리턴한다.")
	@Test
	public void existsByNickName() throws Exception {
		//given
		String targetName = "testNickName1";
		User user = createUser(targetName, "image.com", "1", "123");
		userRepository.save(user);

		//when
		boolean result = userRepository.existsByNickName(targetName);

		//then
		assertThat(result).isTrue();
	}

	@DisplayName("refresh token으로 user를 조회한다.")
	@Test
	public void findByRefreshToken() throws Exception {
		//given
		String targetRefreshToken = "123";
		User user = createUser("testNickName1", "image.com", "1", targetRefreshToken);
		userRepository.save(user);

		//when
		User findUser = userRepository.findByRefreshToken(targetRefreshToken).get();

		//then
		assertThat(findUser)
			.extracting("nickName", "imageUrl", "socialId", "refreshToken")
			.contains("testNickName1", "image.com", "1", targetRefreshToken);
	}

	@DisplayName("userId와 RefreshToken으로 RefreshToken을 null로 수정한다.")
	@Test
	public void updateRefreshTokenByUserIdAndRefreshToken() throws Exception {
		//given
		String targetRefreshToken = "123";
		String targetNickName = "testNickName1";
		User user = createUser(targetNickName, "image.com", "1", targetRefreshToken);
		User savedUser = userRepository.save(user);

		//when
		int updatedCount = userRepository.updateRefreshTokenByUserIdAndRefreshToken(savedUser.getUserId(),
			savedUser.getRefreshToken());

		//then
		assertTrue(updatedCount > 0);
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