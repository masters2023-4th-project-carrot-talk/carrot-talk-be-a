package com.example.carrot.product.entity;

public enum ProductStatus {
	ON_SALE, SOLD_OUT, RESERVED;

	public static ProductStatus chooseStatus(final String statusString) {
		if (statusString.equalsIgnoreCase("RESERVED")) {
			return ProductStatus.RESERVED;
		}

		if (statusString.equalsIgnoreCase("SOLD_OUT")) {
			return ProductStatus.SOLD_OUT;
		}

		return ProductStatus.ON_SALE;
	}

	public String getName() {
		return this.name();
	}
}
