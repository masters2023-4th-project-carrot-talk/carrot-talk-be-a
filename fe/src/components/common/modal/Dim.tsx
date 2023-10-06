import { FC } from 'react';
import { Theme, css } from '@emotion/react';

type Props = {
  isOpen: boolean;
  onClose?: () => void;
};

export const Dim: FC<Props> = ({ isOpen, onClose }) => {
  return <>{isOpen && <div css={dimStyle} onClick={onClose} />}</>;
};

const dimStyle = (theme: Theme) => {
  return css`
    position: absolute;
    inset: 0;
    z-index: 105;
    width: 393px;
    height: 100vh;
    background-color: ${theme.color.neutral.overlay};
  `;
};
