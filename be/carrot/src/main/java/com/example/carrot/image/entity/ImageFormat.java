package com.example.carrot.image.entity;

import java.util.Set;

import com.example.carrot.global.exception.CustomException;
import com.example.carrot.global.exception.StatusCode;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public enum ImageFormat {

	PNG(".png"),
	JPG(".jpg"),
	JPEG(".jpeg");

	private final String extension;
	private static final Set<String> VALID_EXTENSIONS = Set.of(PNG.extension, JPG.extension, JPEG.extension);

	public static void validate(String key) {
		String keyLowerCase = key.toLowerCase();
		if (VALID_EXTENSIONS.contains(keyLowerCase)) {
			return;
		}

		throw new CustomException(StatusCode.UPLOAD_IMAGE_EXCEPTION);
	}

}
