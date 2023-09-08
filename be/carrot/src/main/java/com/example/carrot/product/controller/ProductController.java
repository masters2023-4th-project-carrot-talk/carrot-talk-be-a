package com.example.carrot.product.controller;

import javax.validation.Valid;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.carrot.global.common.ApiResponse;
import com.example.carrot.product.dto.request.ModifyProductRequestDto;
import com.example.carrot.product.dto.response.MainPageResponseDto;
import com.example.carrot.product.dto.response.ModifyProductResponseDto;
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

	@PutMapping("/products/{productId}")
	public ApiResponse<ModifyProductResponseDto> modifyProduct(
		@Valid @RequestBody ModifyProductRequestDto modifyProductRequestDto,
		@RequestAttribute Long userId,
		@PathVariable Long productId) {

		ModifyProductResponseDto modifyProductResponseDto = productService.modifyProduct(modifyProductRequestDto,
			userId, productId);
		return ApiResponse.success(modifyProductResponseDto);
	}
}
