package com.example.carrot.location.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.carrot.global.exception.CustomException;
import com.example.carrot.global.exception.StatusCode;
import com.example.carrot.location.entity.Location;
import com.example.carrot.location.repository.LocationRepository;

import lombok.RequiredArgsConstructor;

@Transactional(readOnly = true)
@Service
@RequiredArgsConstructor
public class LocationService {

	private final LocationRepository locationRepository;

	public Location findLocation(Long locationId) {
		return locationRepository.findByLocationId(locationId)
			.orElseThrow(() -> new CustomException(StatusCode.NOT_FOUND_LOCATION));
	}
}
