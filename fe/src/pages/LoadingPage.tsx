import { Theme, css } from '@emotion/react';

export const LoadingPage: React.FC = () => {
  return (
    <div css={pageStyle}>
      Loading...
      {`( •̀ ω •́ )✧`}
    </div>
  );
};

const pageStyle = (theme: Theme) => {
  return css`
    width: 100%;
    height: 100%;
  `;
};
