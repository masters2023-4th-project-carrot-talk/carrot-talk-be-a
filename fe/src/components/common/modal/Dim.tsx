import { FC } from 'react';
import { Theme, css } from '@emotion/react';

type Props = {
  isOpen: boolean;
  onClose?: () => void;
};

// TODO alert가 아닌 딤일때만 onClose 필요
export const Dim: FC<Props> = ({ isOpen, onClose }) => {
  return <>{isOpen && <div css={DimStyle} onClick={onClose} />}</>;
};

const DimStyle = (theme: Theme) => {
  return css`
    position: fixed;
    top: 0;
    left: 0;
    z-index: 105;
    width: 393px;
    height: 852px;
    background-color: ${theme.color.neutral.overlay};
  `;
};
