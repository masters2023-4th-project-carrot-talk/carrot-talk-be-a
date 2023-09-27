package com.example.carrot.product.entity;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import com.example.carrot.category.entity.Category;
import com.example.carrot.chat_room.entity.ChatRoom;
import com.example.carrot.global.common.BaseAllTimeEntity;
import com.example.carrot.global.exception.CustomException;
import com.example.carrot.global.exception.StatusCode;
import com.example.carrot.image.entity.Image;
import com.example.carrot.like.entity.Like;
import com.example.carrot.location.entity.Location;
import com.example.carrot.product_image.entity.ProductImage;
import com.example.carrot.user.entity.User;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Product extends BaseAllTimeEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long productId;

	@Column(nullable = false)
	private String title;

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

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "location_id")
	private Location location;

	@OneToMany(mappedBy = "product", cascade = {CascadeType.PERSIST, CascadeType.REMOVE})
	private List<Like> likes = new ArrayList<>();

	@OneToMany(mappedBy = "product", cascade = {CascadeType.PERSIST, CascadeType.REMOVE})
	private List<ProductImage> productImages = new ArrayList<>();

	@OneToMany(mappedBy = "product", cascade = {CascadeType.PERSIST, CascadeType.REMOVE})
	private List<ChatRoom> chatRooms = new ArrayList<>();

	@Builder
	public Product(String title, Long price, String content, Long hits, ProductStatus status, User user,
		Category category, Location location) {
		this.title = title;
		this.price = price;
		this.content = content;
		this.hits = hits;
		this.status = status;
		this.user = user;
		this.category = category;
		this.location = location;
	}

	public void validateEditAccess(Long userId) {
		if (!this.user.getUserId().equals(userId)) {
			throw new CustomException(StatusCode.NO_EDIT_PERMISSION);
		}
	}

	public Product updateStatus(ProductStatus productStatus) {
		this.status = productStatus;
		return this;
	}

	public void increaseHit() {
		this.hits++;
	}

	public boolean isContainModifyImages(List<Long> images) {
		return this.productImages.stream()
			.noneMatch(productImage -> images.contains(productImage.getImage()));
	}

	public void update(ProductDetails productDetails, Long userId) {
		this.validateEditAccess(userId);
		this.category = productDetails.getCategory();
		this.location = productDetails.getLocation();
		this.price = productDetails.getPrice();
		this.title = productDetails.getTitle();
		this.content = productDetails.getContent();
	}

	public void update(Image mainImage, List<Image> subImages, ProductDetails productDetails, Long userId) {
		this.update(productDetails, userId);
		this.productImages = new ArrayList<>();
		this.productImages.add(addProductMainImage(mainImage));
		this.productImages.addAll(addProductImages(subImages));
	}

	private ProductImage addProductMainImage(Image mainImage) {
		return ProductImage.builder()
			.image(mainImage)
			.isMain(true)
			.product(this)
			.build();
	}

	private List<ProductImage> addProductImages(List<Image> images) {
		return images.stream()
			.map(image -> ProductImage.builder()
				.product(this)
				.isMain(false)
				.image(image)
				.build())
			.collect(Collectors.toList());
	}
}
