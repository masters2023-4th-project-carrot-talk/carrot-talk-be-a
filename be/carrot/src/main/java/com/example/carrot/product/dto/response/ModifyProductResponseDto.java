package com.example.carrot.product.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
public class ModifyProductResponseDto {

	private Long productId;

	@Builder
	public ModifyProductResponseDto(Long productId) {
		this.productId = productId;
	}

	public static ModifyProductResponseDto of(Long productId) {
		return ModifyProductResponseDto.builder()
			.productId(productId)
			.build();
	}
}
