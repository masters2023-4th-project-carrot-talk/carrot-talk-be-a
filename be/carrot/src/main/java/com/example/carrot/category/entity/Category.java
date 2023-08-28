package com.example.carrot.category.entity;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

import com.example.carrot.product.entity.Product;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@Entity
public class Category {
	@Id
	@GeneratedValue
	private Long categoryId;
	private String name;
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
