package com.example.carrot.sales_history.entity;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.example.carrot.global.common.BaseTimeEntity;
import com.example.carrot.product.entity.Product;
import com.example.carrot.user.entity.User;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
public class SalesHistory extends BaseTimeEntity {

	@Id
	@GeneratedValue
	private Long salesHistoryId;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id")
	private User user;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "product_id")
	private Product product;

	@Builder
	public SalesHistory(Long salesHistoryId, User user, Product product) {
		this.salesHistoryId = salesHistoryId;
		this.user = user;
		this.product = product;
	}
}
