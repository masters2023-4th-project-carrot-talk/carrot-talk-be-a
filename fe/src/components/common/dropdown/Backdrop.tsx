import { css, Theme } from '@emotion/react';

type Props = {
  onClick?: (e: React.MouseEvent) => void; // BUG dropdown 버그로 인해 임시 추가
};

export const Backdrop: React.FC<Props> = ({ onClick }) => {
  return <div css={(theme) => backdropStyle(theme)} onClick={onClick}></div>;
};

const backdropStyle = (theme: Theme) => css`
  position: fixed;
  z-index: 99;
  top: 0;
  width: 393px;
  height: 100vh;
  background-color: ${theme.color.neutral.overlay};
`;
// inset: 0;
