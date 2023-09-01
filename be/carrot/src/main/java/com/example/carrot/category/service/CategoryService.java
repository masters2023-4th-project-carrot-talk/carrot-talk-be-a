package com.example.carrot.category.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.carrot.category.dto.response.CategoryResponseDto;
import com.example.carrot.category.entity.Category;
import com.example.carrot.category.repository.CategoryRepository;
import com.example.carrot.global.exception.CustomException;
import com.example.carrot.global.exception.StatusCode;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CategoryService {

	private final CategoryRepository categoryRepository;

	public CategoryResponseDto findCategories() {
		List<Category> categories = categoryRepository.findAll();
		return CategoryResponseDto.of(categories);
	}

}
