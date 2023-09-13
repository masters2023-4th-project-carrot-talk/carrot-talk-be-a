import { Theme, css } from '@emotion/react';
import { useState } from 'react';

type Props = {
  imageUrls?: string[];
};

export const Carousel: React.FC<Props> = ({ imageUrls }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(1);

  const randomGitProfile =
    'https://avatars.githubusercontent.com/u/52685259?v=4';
  return (
    <div css={(theme) => carouselStyle(theme)}>
      <div className="thumbnail-box-track">
        <img src={randomGitProfile} />
        <img src={randomGitProfile} />
        <img src={randomGitProfile} />
      </div>
      <div className="thumbnail-page-nav">
        {currentIndex} / {imageUrls?.length}
      </div>
    </div>
  );
};

const carouselStyle = (theme: Theme) => {
  return css`
    position: relative;
    max-height: 491px;
    width: 100%;

    .thumbnail-box-track {
      display: flex;
      width: fit-content;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .thumbnail-page-nav {
      position: absolute;
      bottom: 16px;
      right: 16px;
      z-index: 200;
      display: inline-flex;
      padding: 8px 16px;
      align-items: flex-start;
      gap: 4px;
      border-radius: 16px;
      background: ${theme.color.neutral.backgroundBlur};

      font: ${theme.font.displayDefault12};
      color: ${theme.color.neutral.textWeak};
    }
  `;
};
