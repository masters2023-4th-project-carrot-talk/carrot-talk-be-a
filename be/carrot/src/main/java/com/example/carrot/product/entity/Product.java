package com.example.carrot.product.entity;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
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
import com.example.carrot.global.common.BaseAllTimeEntity;
import com.example.carrot.like.entity.Like;
import com.example.carrot.location.entity.Location;
import com.example.carrot.product_image.entity.ProductImage;
import com.example.carrot.user.entity.User;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@Entity
public class Product extends BaseAllTimeEntity {
	@Id
	@GeneratedValue
	private Long productId;

	@Column(nullable = false)
	private String name;
	private Long price;

	@Column(length = 500)
	private String content;

	@Column(nullable = false, columnDefinition = "bigint default 0")
	private Long hits;

	@Column(nullable = false)
	@Enumerated(EnumType.STRING)
	private ProductStatus status;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id")
	private User user;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "category_id")
	private Category category;

	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "location_id")
	private Location location;

	@OneToMany(mappedBy = "product")
	private List<Like> likes = new ArrayList<>();

	@OneToMany(mappedBy = "product")
	private List<ProductImage> productImages = new ArrayList<>();

	@Builder
	public Product(Long productId, String name, Long price, String content, Long hits, ProductStatus status, User user,
		 Category category, Location location) {
		this.productId = productId;
		this.name = name;
		this.price = price;
		this.content = content;
		this.hits = hits;
		this.status = status;
		this.user = user;
		this.category = category;
		this.location = location;
	}
}
