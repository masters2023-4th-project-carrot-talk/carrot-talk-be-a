package com.example.carrot.product.dto.request;

import java.util.List;

import javax.validation.constraints.NotNull;

import lombok.Builder;
import lombok.NoArgsConstructor;

@NoArgsConstructor
public class SaveProductRequestDto {

	@NotNull
	private List<Long> images; // imageId
	@NotNull
	private String title;
	@NotNull
	private Long categoryId;
	@NotNull
	private Long locationId;
	private String content;
	private Long price;

	@Builder
	public SaveProductRequestDto(List<Long> images, String title, Long categoryId, Long locationId, String content,
		Long price) {
		this.images = images;
		this.title = title;
		this.categoryId = categoryId;
		this.locationId = locationId;
		this.content = content;
		this.price = price;
	}

	public List<Long> getImages() {
		return images;
	}

	public String getTitle() {
		return title;
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
