import { Theme, css } from '@emotion/react';
import { FC, ReactNode } from 'react';

type Props = {
  children?: ReactNode;
};

export const MenuBox: FC<Props> = ({ children }) => {
  return <ul css={menuItemStyle}>{children}</ul>;
};

const menuItemStyle = (theme: Theme) => css`
  display: flex;
  width: 240px;
  flex-direction: column;
  align-items: flex-start;
  border-radius: 12px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);

  & > li {
    &:first-of-type {
      border-radius: 16px 16px 0px 0px;
    }

    &:last-of-type {
      border-radius: 0px 0px 16px 16px;
    }

    &:not(:last-of-type) {
      border-bottom: 0.8px solid ${theme.color.neutral.border};
    }
  }
`;
