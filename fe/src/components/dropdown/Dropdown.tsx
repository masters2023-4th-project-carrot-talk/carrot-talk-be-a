import { css } from '@emotion/react';
import { Children, FC, ReactNode, useState } from 'react';
import { findButtonElement, findListElement } from '@utils/findElement';
import { Backdrop } from '@components/common/dropdown/Backdrop';

type Props = {
  children?: ReactNode;
  align?: 'left' | 'right';
};

export const Dropdown: FC<Props> = ({ children, align }) => {
  const [isOpen, setIsOpen] = useState(false);

  const childrenArray = Children.toArray(children);

  const button = findButtonElement(childrenArray);
  const list = findListElement(childrenArray);

  if (!button || !list) {
    return null;
  }

  const openList = () => setIsOpen(true);
  const closeList = () => setIsOpen(false);

  return (
    <div css={() => dropdownStyle(align)}>
      <div onClick={openList}>{button}</div>
      {isOpen && list}
      {isOpen && <Backdrop onClick={closeList} />}
    </div>
  );
};

const dropdownStyle = (align?: 'left' | 'right') => css`
  position: relative;

  & ul {
    position: absolute;
    z-index: 9999;
    ${align ?? 'left'}: 0;
  }
`;
