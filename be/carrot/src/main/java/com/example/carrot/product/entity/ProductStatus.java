package com.example.carrot.product.entity;

public enum ProductStatus {
	ON_SALE, SOLD_OUT, RESERVED;

	public String getName() {
		return this.name();
	}

	// 단순 choose 로직이라 예외 처리는 그 전 단계에서 해야 함
	public static ProductStatus chooseStatus(final String statusString) {
		if (statusString.equalsIgnoreCase("ON_SALE")) {
			return ProductStatus.ON_SALE;
		}

		if (statusString.equalsIgnoreCase("SOLD_OUT")) {
			return ProductStatus.SOLD_OUT;
		}

		return ProductStatus.RESERVED;
	}
}
