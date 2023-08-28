import { Theme, css } from '@emotion/react';
import { InputHTMLAttributes } from 'react';

type Props = {
  variant: 'filled' | 'outlined' | 'ghost';
  radius?: 's' | 'l';
} & InputHTMLAttributes<HTMLInputElement>;

export const Input: React.FC<Props> = ({ variant, radius, ...props }) => {
  return (
    <input css={(theme) => inputStyle(theme, variant, radius)} {...props} />
  );
};

const inputStyle = (
  theme: Theme,
  variant: 'filled' | 'outlined' | 'ghost',
  radius?: 's' | 'l',
) => {
  const VARIANT = {
    filled: {
      padding: '8px',
      font: theme.font.availableDefault16,
      color: theme.color.neutral.textWeak,
      border: 'none',
      background: theme.color.neutral.backgroundBold,
    },
    outlined: {
      padding: '4px 12px',
      border: `1px solid ${theme.color.neutral.border}`,
      background: theme.color.neutral.background,
    },
    ghost: {
      paddingBottom: '16px',
      border: 'none',
      borderBottom: `1px solid ${theme.color.neutral.border}`,
    },
  };

  const RADIUS = {
    s: {
      borderRadius: '8px',
    },
    l: {
      borderRadius: '18px',
    },
    none: {
      borderRadius: '0',
    },
  };

  return css`
    width: '100%';  
    display: flex;
    gap: 4px;

    ${VARIANT[variant]}
    ${RADIUS[radius ?? 'none']}

    &:focus {
      outline: none;
    }
  `;
};
