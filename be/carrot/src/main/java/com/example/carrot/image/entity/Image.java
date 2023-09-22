package com.example.carrot.image.entity;

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import com.example.carrot.global.common.BaseCreatedTimeEntity;
import com.example.carrot.global.exception.CustomException;
import com.example.carrot.global.exception.StatusCode;
import com.example.carrot.product_image.entity.ProductImage;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Image extends BaseCreatedTimeEntity {

	private static final Pattern IMAGE_URL_PATTERN = Pattern.compile("^https?://.*$");

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long imageId;

	@Column(nullable = false, length = 500)
	private String imageUrl;

	// TODO: mutable list인데 immutable하게 바꾸고 addProductImage 나 removeProductImage 같은 메소드를 새로 만들어주기
	@OneToMany(mappedBy = "image", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<ProductImage> productImages = new ArrayList<>();

	public Image(String imageUrl) {
		validateImageUrl(imageUrl);
		this.imageUrl = imageUrl;
	}

	private void validateImageUrl(String imageUrl) {
		Matcher matcher = IMAGE_URL_PATTERN.matcher(imageUrl);
		boolean isImageUrl = matcher.matches();
		if (!isImageUrl) {
			throw new CustomException(StatusCode.NOT_IMAGE);
		}
	}

	public static List<Image> makeImages(List<String> imageUrls) {
		return imageUrls.stream()
			.map(Image::new)
			.toList();
	}

}
