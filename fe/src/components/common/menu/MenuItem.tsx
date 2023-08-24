import { Theme, css } from '@emotion/react';
import { FC } from 'react';

type Props = {
  children?: string;
  state?: 'default' | 'selected';
  variant?: 'default' | 'warning';
};

export const MenuItem: FC<Props> = ({ children, state, variant }) => {
  return (
    <li css={(theme) => menuItemStyle(theme, state, variant)}>{children}</li>
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
