import { useImageUpload } from '@/queries/products';
import { css, Theme } from '@emotion/react';
import { useRef, useState } from 'react';
import { Camera } from '../common/icons';
import { ImageItem } from './ImageItem';

export const ImageInput: React.FC = () => {
  const [pictureList, setPictureList] = useState<{ id: number; url: string }[]>(
    [],
  );
  const imageMutation = useImageUpload();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const addImage = () => {
    if (pictureList.length >= 10) {
      return;
    }

    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const onChangeFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    // 파일이 없으면 업로드 하지 않음
    if (!file) {
      return;
    }

    // 허용한 타입이 아니거나 용량이 2MB를 초과하면 업로드 하지 않음
    const allowedTypes = ['image/png', 'image/jpg', 'image/jpeg'];
    const volumeLimit = 1024 * 1024 * 2; // 2MB

    console.log('type', file.type);
    console.log('size', file.size / volumeLimit);

    if (!allowedTypes.includes(file.type) || file.size > volumeLimit) {
      return;
    }

    const formData = new FormData();
    formData.append('image', file);

    imageMutation.mutate(formData, {
      onSuccess: (result) => {
        if (result.success) {
          setPictureList([
            ...pictureList,
            { id: result.data.imageId, url: result.data.imageUrl },
          ]);
        }
      },
      onError: (error) => {
        if (error instanceof Error) {
          throw error;
        }
      },
    });
  };

  return (
    <div css={(theme) => pictureInputStype(theme)}>
      <div className="picture__container">
        <button
          className="picture__add-btn"
          onClick={addImage}
          disabled={pictureList.length >= 10}
        >
          <Camera />
          <span>{pictureList.length}/10</span>
        </button>
        <input
          type="file"
          accept=".png, .jpg, .jpeg"
          className="picture__file-input"
          ref={fileInputRef}
          onChange={onChangeFileInput}
        />
        {pictureList.map((picture, index) => (
          <ImageItem
            key={picture.id}
            size="m"
            imageUrl={picture.url}
            label={index === 0 ? '대표 사진' : ''}
          />
        ))}
      </div>
    </div>
  );
};

const pictureInputStype = (theme: Theme) => css`
  padding-top: 8px;
  overflow-x: auto;
  scroll-behavior: smooth;

  &::-webkit-scrollbar {
    display: none;
  }

  & .picture {
    &__container {
      display: flex;
      gap: 16px;
    }

    &__add-btn {
      flex-shrink: 0;
      width: 80px;
      height: 80px;
      padding: 16px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 4px;
      border-radius: 16px;
      border: 0.8px solid ${theme.color.neutral.border};

      & > svg {
        stroke: ${theme.color.neutral.textStrong};
      }

      &:hover,
      &:active {
        opacity: 0.8;
      }

      &:disabled {
        cursor: default;
        opacity: 0.32;
      }
    }

    &__file-input {
      display: none;
    }
  }
`;
