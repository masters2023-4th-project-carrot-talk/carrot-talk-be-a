package com.example.carrot.product.dto.request;

import java.util.ArrayList;
import java.util.List;

import javax.validation.constraints.NotNull;

import com.example.carrot.category.entity.Category;
import com.example.carrot.image.entity.Image;
import com.example.carrot.location.entity.Location;
import com.example.carrot.product.entity.Product;
import com.example.carrot.product_image.entity.ProductImage;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Builder;
import lombok.NoArgsConstructor;

@NoArgsConstructor
public class SaveProductRequestDto {

	@NotNull
	private List<Long> images; // imageId
	@NotNull
	private String name;
	@NotNull
	private Long categoryId;
	@NotNull
	private Long locationId;
	private String content;
	private Long price;

	@Builder
	public SaveProductRequestDto(List<Long> images, String name, Long categoryId, Long locationId, String content,
		Long price) {
		this.images = images;
		this.name = name;
		this.categoryId = categoryId;
		this.locationId = locationId;
		this.content = content;
		this.price = price;
	}
	//
	// public static Product toEntity(SaveProductRequestDto saveProductRequestDto) {
	// 	List<ProductImage> productImages = makeProductImageList(saveProductRequestDto);
	//
	// 	return Product.builder()
	// 		.name(saveProductRequestDto.name)
	// 		.content(saveProductRequestDto.content)
	// 		.price(saveProductRequestDto.price)
	// 		.category(Category.builder().categoryId(saveProductRequestDto.categoryId).build())
	// 		.location(Location.builder().locationId(saveProductRequestDto.locationId).build())
	// 		.productImages(productImages)
	// 		.build();
	// }
	//
	// private static List<ProductImage> makeProductImageList(SaveProductRequestDto saveProductRequestDto) {
	// 	List<Long> images = saveProductRequestDto.images;
	// 	List<ProductImage> productImages = new ArrayList<>();
	// 	for (Long image : images) {
	// 		productImages.add(ProductImage.builder().image(Image.builder().imageId(image).build()).build());
	// 	}
	// 	return productImages;
	// }

	public List<Long> getImages() {
		return images;
	}

	public String getName() {
		return name;
	}

	public Long getCategoryId() {
		return categoryId;
	}

	public Long getLocationId() {
		return locationId;
	}

	public String getContent() {
		return content;
	}

	public Long getPrice() {
		return price;
	}
}
