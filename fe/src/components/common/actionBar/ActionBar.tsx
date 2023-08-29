import { Theme, css } from '@emotion/react';

type Props = {
  children: React.ReactNode;
  className?: string;
};

export const ActionBar: React.FC<Props> = ({ children, className }) => {
  return (
    <div className={className} css={(theme) => actionBarStyle(theme)}>
      {children}
    </div>
  );
};

const actionBarStyle = (theme: Theme) => {
  return css`
    position: sticky;
    bottom: 0;
    box-sizing: border-box;

    display: flex;
    width: 393px;
    height: 64px;
    align-items: center;
    border-top: 0.8px solid ${theme.color.neutral.border};
    background-color: ${theme.color.neutral.backgroundWeak};
  `;
};
