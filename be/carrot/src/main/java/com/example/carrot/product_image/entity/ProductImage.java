package com.example.carrot.product_image.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.example.carrot.global.common.BaseCreatedTimeEntity;
import com.example.carrot.image.entity.Image;
import com.example.carrot.product.entity.Product;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@Entity
public class ProductImage extends BaseCreatedTimeEntity {

	@Id
	@GeneratedValue
	private Long productImageId;

	@Column(nullable = false)
	private boolean isMain;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "product_id")
	private Product product;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "image_id")
	private Image image;

	@Builder
	public ProductImage(Long productImageId, boolean isMain, Product product, Image image) {
		this.productImageId = productImageId;
		this.isMain = isMain;
		this.product = product;
		this.image = image;
	}
}
