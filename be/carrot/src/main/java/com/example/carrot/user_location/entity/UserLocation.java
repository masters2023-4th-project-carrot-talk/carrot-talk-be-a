package com.example.carrot.user_location.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.example.carrot.global.common.BaseCreatedTimeEntity;
import com.example.carrot.location.entity.Location;
import com.example.carrot.user.entity.User;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@NoArgsConstructor
public class UserLocation extends BaseCreatedTimeEntity {
	@Id
	@GeneratedValue
	private Long userLocationId;

	@Column(nullable = false)
	private boolean isMain;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id")
	private User user;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "location_id")
	private Location location;

	@Builder
	public UserLocation(Long userLocationId, boolean isMain, User user, Location location) {
		this.userLocationId = userLocationId;
		this.isMain = isMain;
		this.user = user;
		this.location = location;
	}

	public void addUser(User user) {
		this.user = user;
		user.getUserLocations().add(this);
	}

	public static UserLocation of(User user, Location location, boolean isMain) {
		UserLocation userLocation = UserLocation.builder()
			.isMain(isMain)
			.location(location)
			.build();

		userLocation.addUser(user);
		return userLocation;
	}
}
