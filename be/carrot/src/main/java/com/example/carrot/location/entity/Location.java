package com.example.carrot.location.entity;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

import com.example.carrot.global.common.BaseCreatedTimeEntity;
import com.example.carrot.product.entity.Product;
import com.example.carrot.user_location.entity.UserLocation;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
public class Location extends BaseCreatedTimeEntity {
	@Id
	@GeneratedValue
	private Long locationId;
	
	@Column(nullable = false)
	private String name;

	@OneToMany(mappedBy = "location")
	private List<UserLocation> userLocations = new ArrayList<>();

	@OneToOne(mappedBy = "location")
	private Product product;

	@Builder
	public Location(Long locationId, String name, List<UserLocation> userLocations, Product product) {
		this.locationId = locationId;
		this.name = name;
		this.userLocations = userLocations;
		this.product = product;
	}
}
