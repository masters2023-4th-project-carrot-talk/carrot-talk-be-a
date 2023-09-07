package com.example.carrot.product.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.carrot.global.common.ApiResponse;
import com.example.carrot.product.dto.response.MainPageResponseDto;
import com.example.carrot.product.service.ProductService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class ProductController {

	private final ProductService productService;

	@GetMapping("/products")
	public ApiResponse<MainPageResponseDto> getMainPage(
		@RequestParam(required = false) Long locationId,
		@RequestParam(required = false) Long categoryId,
		@RequestParam(required = false) Long next,
		@RequestParam(defaultValue = "10") int size) {

		MainPageResponseDto mainPageResponseDto = productService.getMainPage(locationId, categoryId, next, size);
		return ApiResponse.success(mainPageResponseDto);
	}
}
