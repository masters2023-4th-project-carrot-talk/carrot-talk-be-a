package com.example.carrot.product.dto.request;

import java.util.List;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ModifyProductRequestDto {

	@Size(min = 1, max = 10, message = "상품 이미지는 1개 이상, 10개 이하여야 합니다.")
	private List<Long> images;
	@NotNull(message = "제목은 필수로 입력해주세요.")
	private String title;
	@NotNull(message = "카테고리는 필수로 입력해주세요.")
	private Long categoryId;
	@NotNull(message = "동네는 필수로 입력해주세요.")
	private Long locationId;
	private String content;
	private Long price;
}
