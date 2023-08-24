import { Theme, css } from '@emotion/react';
import { ButtonHTMLAttributes, FC } from 'react';

type Props = {
  variant: 'default' | 'fab';
  size?: 's' | 'l';
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const TextButton: FC<Props> = ({ variant, size, ...props }) => {
  return (
    <button css={(theme) => TextButtonStyle(theme, variant, size)} {...props}>
      {props.children}
    </button>
  );
};

const TextButtonStyle = (
  theme: Theme,
  variant: 'default' | 'fab',
  size?: 's' | 'l',
) => {
  const SIZE_STYLES = {
    s: {
      width: '32px',
      height: '32px',
    },
    l: {
      width: '56px',
      height: '56px',
    },
  };

  const sizeStyles = SIZE_STYLES[size || 'l'];

  const VARIANT = {
    default: {
      gap: '8px',
      font: theme.fonts.availableStrong16,
      color: theme.color.neutral.text,
    },
    fab: {
      ...sizeStyles,
      borderRadius: '56px',
      backgroundColor: theme.color.accent.backgroundPrimary,
    },
  };

  return css`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: transparent;
    padding: 8px;

    ${VARIANT[variant]}

    &:hover, &:active {
      opacity: 0.8;
    }

    &:disabled {
      opacity: 0.32;
    }
  `;
};
