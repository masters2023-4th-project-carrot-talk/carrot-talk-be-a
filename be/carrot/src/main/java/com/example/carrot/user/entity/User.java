package com.example.carrot.user.entity;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.example.carrot.global.common.BaseAllTimeEntity;
import com.example.carrot.global.jwt.Jwt;
import com.example.carrot.like.entity.Like;
import com.example.carrot.product.entity.Product;
import com.example.carrot.user_location.entity.UserLocation;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
@Table(name = "users")
public class User extends BaseAllTimeEntity {
	@Id
	@GeneratedValue
	private Long userId;

	@Column(unique = true, nullable = false)
	private String nickName;

	@Column(length = 500)
	private String imageUrl;

	@Column(length = 500)
	private String refreshToken;

	@Column(nullable = false)
	private String socialId;

	@OneToMany(mappedBy = "user")
	private List<UserLocation> userLocations = new ArrayList<>();

	@OneToMany(mappedBy = "user")
	private List<Like> likes = new ArrayList<>();

	@OneToMany(mappedBy = "user")
	private List<Product> products = new ArrayList<>();

	@Builder
	public User(Long userId, String nickName, String imageUrl, String refreshToken, String socialId) {
		this.userId = userId;
		this.nickName = nickName;
		this.imageUrl = imageUrl;
		this.refreshToken = refreshToken;
		this.socialId = socialId;
	}

	public void updateRefreshToken(Jwt jwt) {
		this.refreshToken = jwt.getRefreshToken();
	}
}
