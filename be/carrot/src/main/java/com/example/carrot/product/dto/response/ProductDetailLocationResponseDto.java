package com.example.carrot.product.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

/**
 * location
 */
@NoArgsConstructor
@AllArgsConstructor
public class ProductDetailLocationResponseDto {

	@JsonProperty("id")
	private Long id;
	@JsonProperty("name")
	private String name;

	public static ProductDetailLocationResponseDto of(Long id, String name) {
		return new ProductDetailLocationResponseDto(id, name);
	}

}
