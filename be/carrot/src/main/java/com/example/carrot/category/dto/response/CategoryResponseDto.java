package com.example.carrot.category.dto.response;

import java.util.List;

import com.example.carrot.category.entity.Category;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class CategoryResponseDto {

	@JsonProperty("categories")
	private final List<Category> categories;

	public static CategoryResponseDto of(List<Category> categories) {
		return new CategoryResponseDto(categories);
	}

}
