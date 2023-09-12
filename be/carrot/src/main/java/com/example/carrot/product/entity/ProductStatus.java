package com.example.carrot.product.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ProductStatus {
	ON_SALE("판매중"),
	SOLD_OUT("판매완료"),
	RESERVED("예약중");

	private String value;

	public static String chooseString(ProductStatus status) {
		if (status == RESERVED) {
			return RESERVED.value;
		}

		if (status == SOLD_OUT) {
			return SOLD_OUT.value;
		}

		return ON_SALE.value;
	}

	public String getName() {
		return this.name();
	}
}
