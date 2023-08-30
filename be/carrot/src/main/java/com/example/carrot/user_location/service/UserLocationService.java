package com.example.carrot.user_location.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.carrot.user_location.entity.UserLocation;
import com.example.carrot.user_location.repository.UserLocationRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class UserLocationService {

	private final UserLocationRepository userLocationRepository;

	public UserLocation saveUserLocation(UserLocation userLocation) {
		return userLocationRepository.save(userLocation);
	}
}
