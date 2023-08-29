package com.example.carrot.product.entity;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

import com.example.carrot.category.entity.Category;
import com.example.carrot.global.common.BaseTimeEntity;
import com.example.carrot.like.entity.Like;
import com.example.carrot.location.entity.Location;
import com.example.carrot.product_image.entity.ProductImage;
import com.example.carrot.sales_history.entity.SalesHistory;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@Entity
public class Product extends BaseTimeEntity {
	@Id
	@GeneratedValue
	private Long productId;

	private String name;
	private Long price;
	private String content;
	private Long hits;

	@Enumerated(EnumType.STRING)
	private ProductStatus status;
	private LocalDateTime modifiedAt;

	@OneToMany(mappedBy = "product")
	private List<Like> likes = new ArrayList<>();

	@OneToMany(mappedBy = "product")
	private List<SalesHistory> salesHistories = new ArrayList<>();

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "category_id")
	private Category category;

	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "location_id")
	private Location location;

	@OneToMany(mappedBy = "product")
	private List<ProductImage> productImages = new ArrayList<>();

	@Builder
	public Product(Long productId, String name, Long price, String content, Long hits, ProductStatus status,
		LocalDateTime modifiedAt, List<Like> likes, List<SalesHistory> salesHistories, Category category,
		Location location,
		List<ProductImage> productImages) {
		this.productId = productId;
		this.name = name;
		this.price = price;
		this.content = content;
		this.hits = hits;
		this.status = status;
		this.modifiedAt = modifiedAt;
		this.likes = likes;
		this.salesHistories = salesHistories;
		this.category = category;
		this.location = location;
		this.productImages = productImages;
	}
}
