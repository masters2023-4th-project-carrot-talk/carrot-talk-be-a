package com.example.carrot.product.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.carrot.category.entity.Category;
import com.example.carrot.category.repository.CategoryRepository;
import com.example.carrot.global.exception.CustomException;
import com.example.carrot.global.exception.StatusCode;
import com.example.carrot.image.entity.Image;
import com.example.carrot.image.repository.ImageRepository;
import com.example.carrot.location.entity.Location;
import com.example.carrot.location.repository.LocationRepository;
import com.example.carrot.product.dto.request.ModifyProductRequestDto;
import com.example.carrot.product.dto.response.MainPageResponseDto;
import com.example.carrot.product.dto.response.ModifyProductResponseDto;
import com.example.carrot.product.dto.response.ProductsResponseDto;
import com.example.carrot.product.entity.Product;
import com.example.carrot.product.repository.ProductRepository;
import com.example.carrot.product_image.entity.ProductImage;
import com.example.carrot.product_image.repository.ProductImageRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ProductService {

	private final ProductRepository productRepository;
	private final ProductImageRepository productImageRepository;
	private final ImageRepository imageRepository;
	private final LocationRepository locationRepository;
	private final CategoryRepository categoryRepository;

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

	@Transactional
	public ModifyProductResponseDto modifyProduct(ModifyProductRequestDto modifyProductRequestDto, Long userId,
		Long productId) {

		Product product = getProduct(productId);

		product.validateEditAccess(userId);

		List<ProductImage> productImages = product.getProductImages();

		productImageRepository.deleteAllInBatch(productImages);

		List<Long> imageIds = modifyProductRequestDto.getImages();

		Image mainImage = getImage(imageIds.get(0));
		List<Image> images = imageRepository.findAllById(imageIds.subList(1, imageIds.size()));

		List<ProductImage> updatedProductImages = new ArrayList<>();
		updatedProductImages.add(ProductImage.of(product, mainImage, true));

		for (Image image : images) {
			updatedProductImages.add(ProductImage.of(product, image, false));
		}

		productImageRepository.saveAll(updatedProductImages);

		Category category = getCategory(modifyProductRequestDto);
		Location location = getLocation(modifyProductRequestDto);

		product.update(
			modifyProductRequestDto.getTitle(), modifyProductRequestDto.getContent(),
			modifyProductRequestDto.getPrice(), category, location);

		return ModifyProductResponseDto.of(product.getProductId());
	}

	private Image getImage(Long imageId) {
		return imageRepository.findById(imageId)
			.orElseThrow(() -> new CustomException(StatusCode.NOT_FOUND_IMAGE));
	}

	private Location getLocation(ModifyProductRequestDto modifyProductRequestDto) {
		return locationRepository.findById(modifyProductRequestDto.getLocationId())
			.orElseThrow(() -> new CustomException(StatusCode.NOT_FOUND_LOCATION));
	}

	private Category getCategory(ModifyProductRequestDto modifyProductRequestDto) {
		return categoryRepository.findById(modifyProductRequestDto.getCategoryId())
			.orElseThrow(() -> new CustomException(StatusCode.NOT_FOUND_CATEGORY));
	}

	private Product getProduct(Long productId) {
		return productRepository.findById(productId)
			.orElseThrow(() -> new CustomException(StatusCode.NOT_FOUND_PRODUCT));
	}
}
