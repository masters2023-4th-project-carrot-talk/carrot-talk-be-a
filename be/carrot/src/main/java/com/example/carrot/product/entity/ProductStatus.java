package com.example.carrot.product.entity;

public enum ProductStatus {
	ON_SALE, SOLD_OUT, RESERVED;

	public static String chooseString(ProductStatus status) {
		if (status == RESERVED) {
			return "예약중";
		}

		if (status == SOLD_OUT) {
			return "판매 완료";
		}

		return "판매중";
	}

	public String getName() {
		return this.name();
	}
}
