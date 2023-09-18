package com.example.carrot.product.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
public class ProductImageResponseDto {

	@JsonProperty("imageId")
	private Long imageId;
	@JsonProperty("imageUrl")
	private String imageUrl;

	public static ProductImageResponseDto of(Long imageId, String imageUrl) {
		return new ProductImageResponseDto(imageId, imageUrl);
	}

}
