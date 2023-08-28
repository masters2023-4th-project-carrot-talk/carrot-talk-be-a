import { Theme, css } from '@emotion/react';
import { InputHTMLAttributes } from 'react';

type Props = {
  variant: 'filled' | 'outlined' | 'ghost';
  radius?: 's' | 'l';
  children?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export const Input: React.FC<Props> = ({
  variant,
  radius,
  children,
  ...props
}) => {
  return (
    <div css={(theme) => inputStyle(theme, variant, radius)}>
      {children}
      <input {...props} />
    </div>
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
    display: flex;
    gap: 4px;
    font: ${theme.font.displayStrong16};
    color: ${theme.color.neutral.textStrong};

    & > input {
      width: '100%';
      display: flex;
      font: ${theme.font.availableDefault16};
      caret-color: ${theme.color.accent.backgroundSecondary};

      ${VARIANT[variant]}
      ${RADIUS[radius ?? 'none']}

      &:focus {
        outline: none;
      }

      &::placeholder {
        color: ${theme.color.neutral.textWeak};
      }
    }
  `;
};
