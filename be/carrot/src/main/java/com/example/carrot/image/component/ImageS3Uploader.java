package com.example.carrot.image.component;

import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;

import javax.imageio.ImageIO;

import org.marvinproject.image.transform.scale.Scale;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import com.example.carrot.global.exception.CustomException;
import com.example.carrot.global.exception.StatusCode;
import com.example.carrot.image.entity.ImageFormat;

import io.awspring.cloud.s3.S3Exception;
import io.awspring.cloud.s3.S3Template;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import marvin.image.MarvinImage;

@Slf4j
@RequiredArgsConstructor
@Component
public class ImageS3Uploader {

	private final S3Template s3Template;

	@Value("${spring.cloud.aws.s3.bucket}")
	private String bucketName;

	public String upload(BufferedImage image, String key, int resizedHeight, int resizedWidth) throws IOException {
		ImageFormat.validate(key);
		image = resizeImage(image, resizedHeight, resizedWidth);

		try (InputStream inputStream = getImageInputStream(image, StringUtils.getFilenameExtension(key))) {
			return s3Template.upload(bucketName, key, inputStream)
				.getURL()
				.toString();
		} catch (S3Exception e) {
			log.info("이미지 업로드 시 S3Exception 발생: {}", e.getMessage());
			throw new CustomException(StatusCode.UPLOAD_IMAGE_EXCEPTION);
		}
	}

	BufferedImage resizeImage(BufferedImage originImage, int resizedHeight, int resizedWidth) {
		if (isLessThanResizedValue(originImage, resizedHeight, resizedWidth)) {
			return originImage;
		}

		MarvinImage resizedImage = new MarvinImage(originImage);

		// TODO: Scale 오브젝트 재사용하도록 (빈 주입이 필요할 듯)
		Scale scale = new Scale();
		scale.load();
		scale.setAttribute("newWidth", resizedWidth);
		scale.setAttribute("newHeight", resizedHeight);
		scale.process(resizedImage.clone(), resizedImage);

		// TODO: 이미지를 다룰 때에는 차원 수, 파일 사이즈, 포맷 같은 다른 메타데이터도 고려하여야 합니다. 해당 값들을 스트링 형태가 아닌, 어떤 DTO의 형태로 반환할 수 있으면 좋겠습니다.
		return resizedImage.getBufferedImageNoAlpha();
	}

	private boolean isLessThanResizedValue(BufferedImage originImage, int resizedHeight, int resizedWidth) {
		return originImage.getWidth() < resizedWidth && originImage.getHeight() < resizedHeight;
	}

	private InputStream getImageInputStream(BufferedImage image, String extension) throws IOException {
		ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
		ImageIO.write(image, extension, byteArrayOutputStream);
		return new ByteArrayInputStream(byteArrayOutputStream.toByteArray());
	}

}
