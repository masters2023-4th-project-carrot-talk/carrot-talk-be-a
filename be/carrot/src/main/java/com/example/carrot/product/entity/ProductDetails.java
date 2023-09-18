package com.example.carrot.product.entity;

import com.example.carrot.category.entity.Category;
import com.example.carrot.location.entity.Location;

import lombok.Builder;
import lombok.Getter;

@Getter
public class ProductDetails {
	private String title;
	private String content;
	private Long price;
	private Location location;
	private Category category;

	@Builder
	public ProductDetails(String title, String content, Long price, Location location, Category category) {
		this.title = title;
		this.content = content;
		this.price = price;
		this.location = location;
		this.category = category;
	}

	public static ProductDetails of(String content, Long price, String title, Category category, Location location) {
		return ProductDetails.builder()
			.title(title)
			.content(content)
			.price(price)
			.category(category)
			.location(location)
			.build();
	}
}
