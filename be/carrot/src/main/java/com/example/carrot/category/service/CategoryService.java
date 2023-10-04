package com.example.carrot.category.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.carrot.category.dto.response.CategoryResponseDto;
import com.example.carrot.category.entity.Category;
import com.example.carrot.category.repository.CategoryRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CategoryService {

	private final CategoryRepository categoryRepository;

	public List<CategoryResponseDto> findCategories() {
		List<Category> categories = categoryRepository.findAll();
		return categories.stream()
			.map(CategoryResponseDto::of)
			// TODO: 일급 컬렉션으로 추출한 후 해당 메소드를 인스턴스 단위의 메소드로 구현하기(?)
			.toList();
	}

}
