package com.example.carrot.product.service;

import java.util.List;

import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.carrot.product.dto.response.MainPageResponseDto;
import com.example.carrot.product.dto.response.ProductsResponseDto;
import com.example.carrot.product.repository.ProductRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ProductService {

	private final ProductRepository productRepository;

	public MainPageResponseDto getMainPage(Long locationId, Long categoryId, Long next, int size) {
		Slice<ProductsResponseDto> products = productRepository.findProducts(locationId, categoryId, next, size);
		List<ProductsResponseDto> contents = products.getContent();

		if (hasNextProductId(contents, size)) {
			return MainPageResponseDto.of(removeLastProduct(contents, size), getNextProductId(contents, size));
		}
		return MainPageResponseDto.of(contents);
	}

	private List<ProductsResponseDto> removeLastProduct(List<ProductsResponseDto> contents, int size) {
		return contents.subList(0, size);
	}

	private Long getNextProductId(List<ProductsResponseDto> contents, int size) {
		return contents.get(size).getId();
	}

	private boolean hasNextProductId(List<ProductsResponseDto> contents, int size) {
		if (contents.size() == size + 1) {
			return true;
		}
		return false;
	}
}
