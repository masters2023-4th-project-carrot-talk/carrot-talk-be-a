package com.example.carrot.category.entity;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import com.example.carrot.global.common.BaseCreatedTimeEntity;
import com.example.carrot.product.entity.Product;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@Entity
public class Category extends BaseCreatedTimeEntity {
	@Id
	@GeneratedValue
	private Long categoryId;

	@Column(nullable = false)
	private String name;

	@Column(nullable = false, length = 500)
	private String imageUrl;

	@OneToMany(mappedBy = "category")
	private List<Product> products = new ArrayList<>();

	@Builder
	public Category(Long categoryId, String name, String imageUrl, List<Product> products) {
		this.categoryId = categoryId;
		this.name = name;
		this.imageUrl = imageUrl;
		this.products = products;
	}
}
