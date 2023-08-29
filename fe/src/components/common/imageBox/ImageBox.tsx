import { Theme, css } from '@emotion/react';

type Props = {
  variant?: 'rectangle' | 'circle';
  size: 's' | 'm' | 'l';
  imgUrl: string;
};

export const ImageBox: React.FC<Props> = ({
  variant = 'rectangle',
  size,
  imgUrl,
}) => {
  return <div css={(theme) => imageBoxStyle(theme, variant, size, imgUrl)} />;
};

const imageBoxStyle = (
  theme: Theme,
  variant: 'rectangle' | 'circle',
  size: 's' | 'm' | 'l',
  imgUrl: string,
) => {
  const SIZE_STYLES = {
    s: {
      width: '48px',
      height: '48px',
      borderRadius: variant === 'circle' ? '50%' : '8px',
    },
    m: {
      width: '80px',
      height: '80px',
      borderRadius: '16px',
    },
    l: {
      width: '120px',
      height: '120px',
      borderRadius: '8px',
    },
  };

  return css`
    ${SIZE_STYLES[size]}
    border: 1px solid ${theme.color.neutral.border};
    background: ${imgUrl && `url(${imgUrl})`} lightgray 50% / cover no-repeat;
  `;
};
