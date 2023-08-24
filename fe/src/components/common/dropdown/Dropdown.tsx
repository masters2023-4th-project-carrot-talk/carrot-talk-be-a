import { css } from '@emotion/react';
import { findButtonElement, findMenuBox } from '@utils/findElement';
import {
  Children,
  FC,
  ReactElement,
  ReactNode,
  cloneElement,
  createContext,
  useState,
} from 'react';
import { Backdrop } from './Backdrop';

type Props = {
  children?: ReactNode;
  align?: 'left' | 'right';
  autoClose?: boolean;
};

export const DropdownContext = createContext({
  isOpen: false,
  closeMenu: () => {},
  autoClose: false,
});

export const Dropdown: FC<Props> = ({ children, align, autoClose = false }) => {
  const [isOpen, setIsOpen] = useState(false);

  const childrenArray = Children.toArray(children);

  const button = findButtonElement(childrenArray);
  const menu = findMenuBox(childrenArray);

  if (!button || !menu) {
    return null;
  }

  const openMenu = () => setIsOpen(true);
  const closeMenu = () => setIsOpen(false);

  return (
    <DropdownContext.Provider value={{ isOpen, closeMenu, autoClose }}>
      <div css={() => dropdownStyle(align)}>
        <div onClick={openMenu}>{button}</div>
        <Backdrop onClick={closeMenu} />
        {isOpen && cloneElement(menu as ReactElement, { onClick: closeMenu })}
      </div>
    </DropdownContext.Provider>
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
