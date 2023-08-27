import { css } from '@emotion/react';
import { Theme } from '@emotion/react/macro';

type Props = {
  children: React.ReactNode;
};

export const ModalHeader: React.FC<Props> = ({ children }) => {
  return <div css={ModalHeaderStyle}>{children}</div>;
};

const ModalHeaderStyle = (theme: Theme) => {
  return css`
    width: 100%;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: transparent;
    padding: 12px 12px 16px 24px;

    font: ${theme.font.displayStrong20};
  `;
};
