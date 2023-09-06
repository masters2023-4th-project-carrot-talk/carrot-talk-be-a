package com.example.carrot.user_location.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.carrot.global.exception.CustomException;
import com.example.carrot.global.exception.StatusCode;
import com.example.carrot.location.dto.request.MainLocationRequestDto;
import com.example.carrot.location.dto.response.MainLocationResponseDto;
import com.example.carrot.location.entity.Location;
import com.example.carrot.location.repository.LocationRepository;
import com.example.carrot.location.service.LocationService;
import com.example.carrot.user.entity.User;
import com.example.carrot.user.repository.UserRepository;
import com.example.carrot.user_location.dto.response.ReadUserLocationResponseDto;
import com.example.carrot.user_location.entity.UserLocation;
import com.example.carrot.user_location.repository.UserLocationRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class UserLocationService {
	private static final int SINGLE_LOCATION_LIMIT = 1;

	private final UserLocationRepository userLocationRepository;
	private final LocationService locationService;
	private final LocationRepository locationRepository;
	private final UserRepository userRepository;

	@Transactional
	public UserLocation saveUserLocation(UserLocation userLocation) {
		return userLocationRepository.save(userLocation);
	}

	@Transactional
	public MainLocationResponseDto registerMainLocation(MainLocationRequestDto mainLocationRequestDto, Long userId) {
		User user = userRepository.findById(userId)
			.orElseThrow(() -> new CustomException(StatusCode.NOT_FOUND_USER));

		List<UserLocation> findUserLocations = user.getUserLocations();

		if (findUserLocations.size() == SINGLE_LOCATION_LIMIT) {
			Location location = locationService.findLocation(mainLocationRequestDto.getLocationId());
			userLocationRepository.save(UserLocation.of(user, location, false));
			return MainLocationResponseDto.from(checkMainLocation(findUserLocations.get(0)));
		}

		Location updatedMainLocation = getUpdatedMainLocation(findUserLocations, mainLocationRequestDto)
			.orElseThrow(() -> new CustomException(StatusCode.NOT_FOUND_LOCATION));

		return MainLocationResponseDto.from(updatedMainLocation);
	}

	private Optional<Location> getUpdatedMainLocation(List<UserLocation> findUserLocations,
		MainLocationRequestDto mainLocationRequestDto) {
		UserLocation updatedMainLocation = null;
		for (UserLocation findUserLocation : findUserLocations) {
			if (findUserLocation.getLocation().getLocationId() == mainLocationRequestDto.getLocationId()) {
				updatedMainLocation = findUserLocation.updateMainLocation(true);
			} else {
				findUserLocation.updateMainLocation(false);
			}
		}
		return updatedMainLocation == null ? Optional.empty() : Optional.of(updatedMainLocation.getLocation());
	}

	private Location checkMainLocation(UserLocation userLocation) {
		if (!userLocation.isMain()) {
			throw new CustomException(StatusCode.NOT_MAIN_LOCATION);
		}
		return userLocation.getLocation();
	}

	public List<ReadUserLocationResponseDto> getUserLocation(Long userId) {
		User user = userRepository.findById(userId)
			.orElseThrow(() -> new CustomException(StatusCode.NOT_FOUND_USER));
		List<UserLocation> findUserLocations = userLocationRepository.findAllByUser(user);

		List<ReadUserLocationResponseDto> readUserLocationResponseDtos = new ArrayList<>();
		for (UserLocation userLocation : findUserLocations) {
			Location location = locationRepository.findByLocationId(userLocation.findLocationId())
				.orElseThrow(() -> new CustomException(StatusCode.NOT_FOUND_LOCATION));

			readUserLocationResponseDtos.add(
				ReadUserLocationResponseDto.of(
					location.getLocationId(),
					location.getName(),
					userLocation.isMain())
			);
		}

		return readUserLocationResponseDtos;
	}

}
