package com.example.carrot.product.dto.request;

import java.util.List;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ModifyProductRequestDto {

	private List<Long> images;
	private String title;
	private Long categoryId;
	private Long locationId;
	private String content;
	private Long price;
}
