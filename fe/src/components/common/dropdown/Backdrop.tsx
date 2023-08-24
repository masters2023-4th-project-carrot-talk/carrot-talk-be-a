import { css, Theme } from '@emotion/react';
import { FC, useContext } from 'react';
import { DropdownContext } from './Dropdown';

type Props = {
  onClick?: () => void;
};

export const Backdrop: FC<Props> = ({ onClick }) => {
  const { isOpen } = useContext(DropdownContext);

  if (!isOpen) {
    return null;
  }

  return <div css={backdropStyle} onClick={onClick}></div>;
};

const backdropStyle = (theme: Theme) => css`
  position: fixed;
  inset: 0;
  background-color: ${theme.color.neutral.overlay};
`;
