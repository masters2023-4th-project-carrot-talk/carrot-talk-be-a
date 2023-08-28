import { css, Theme } from '@emotion/react';

type Props = {
  onClick?: () => void;
};

export const Backdrop: React.FC<Props> = ({ onClick }) => {
  return <div css={(theme) => backdropStyle(theme)} onClick={onClick}></div>;
};

const backdropStyle = (theme: Theme) => css`
  position: fixed;
  inset: 0;
  background-color: ${theme.color.neutral.overlay};
`;
