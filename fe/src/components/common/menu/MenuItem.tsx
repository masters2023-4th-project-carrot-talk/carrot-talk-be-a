import { Theme, css } from '@emotion/react';
import { FC, useContext } from 'react';
import { DropdownContext } from '../dropdown/Dropdown';

type Props = {
  children?: string;
  state?: 'default' | 'selected';
  variant?: 'default' | 'warning';
  onClick?: () => void;
};

export const MenuItem: FC<Props> = ({ children, state, variant, onClick }) => {
  const { closeMenu, autoClose } = useContext(DropdownContext);

  const handleClick = () => {
    onClick?.();
    autoClose && closeMenu();
  };

  return (
    <li
      css={(theme) => menuItemStyle(theme, state, variant)}
      onClick={handleClick}
    >
      {children}
    </li>
  );
};

const menuItemStyle = (
  theme: Theme,
  state?: 'default' | 'selected',
  variant?: 'default' | 'warning',
) => {
  const STATE = {
    default: {
      font: theme.font.availableDefault16,
    },
    selected: {
      font: theme.font.enabledStrong16,
    },
  };

  const VARIANT = {
    default: {
      color: theme.color.neutral.textStrong,
    },
    warning: {
      color: theme.color.system.warning,
    },
  };

  return css`
    display: flex;
    padding: 16px;
    align-items: center;
    gap: 8px;
    align-self: stretch;
    background: ${theme.color.neutral.background};
    color: ${theme.color.neutral.textStrong};

    ${STATE[state || 'default']};
    ${VARIANT[variant || 'default']}

    &:hover,
    &:active {
      background: ${theme.color.neutral.backgroundBold};
    }
  `;
};
