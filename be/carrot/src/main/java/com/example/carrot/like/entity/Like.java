package com.example.carrot.like.entity;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.example.carrot.global.common.BaseCreatedTimeEntity;
import com.example.carrot.product.entity.Product;
import com.example.carrot.user.entity.User;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@Entity
@Table(name = "likes")
public class Like extends BaseCreatedTimeEntity {

	@Id
	@GeneratedValue
	private Long likeId;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id")
	private User user;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "product_id")
	private Product product;

	@Builder
	public Like(User user, Product product) {
		this.user = user;
		this.product = product;
	}
}
