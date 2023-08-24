import { Theme, css } from '@emotion/react';
import { ButtonHTMLAttributes, FC } from 'react';

type Props = {
  variant: 'rectangle' | 'category';
  state: 'default' | 'active';
  size?: 's' | 'l';
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: FC<Props> = ({ variant, state, size, ...props }) => {
  return (
    <button
      css={(theme) => ButtonStyle(theme, variant, state, size)}
      {...props}
    >
      {props.children}
    </button>
  );
};

const ButtonStyle = (
  theme: Theme,
  variant: 'rectangle' | 'category',
  state: 'default' | 'active',
  size?: 's' | 'l',
) => {
  const SIZE_STYLES = {
    s: {
      padding: '8px 16px',
      width: 'fit-content',
      font: theme.fonts.availableStrong12,
    },
    l: {
      padding: '16px',
      width: '329px',
      font: theme.fonts.availableStrong16,
    },
  };

  const sizeStyles = SIZE_STYLES[size || 'l'];

  const VARIANT = {
    rectangle: {
      ...sizeStyles,
      borderRadius: '8px',
      gap: '4px',
    },
    category: {
      height: '32px',
      padding: '0px 16px',
      borderRadius: '50px',
      font: theme.fonts.displayDefault12,
    },
  };

  const STATE = {
    default: {
      border: `1px solid ${theme.color.neutral.border}`,
      color: theme.color.accent.textWeak,
    },
    active: {
      background: theme.color.accent.backgroundPrimary,
      color: theme.color.accent.text,
    },
  };

  return css`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: transparent;

    ${VARIANT[variant]}
    ${STATE[state]}

    &:hover, &:active {
      opacity: 0.8;
    }

    &:disabled {
      opacity: 0.32;
    }
  `;
};
