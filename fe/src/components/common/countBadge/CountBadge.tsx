import { css, Theme } from '@emotion/react';

type Props = {
  count: number;
};

export const CountBadge: React.FC<Props> = ({ count }) => {
  return (
    <div css={(theme) => countBadgeStyle(theme)}>
      <span>{count}</span>
    </div>
  );
};

const countBadgeStyle = (theme: Theme) => css`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  font: ${theme.font.displayDefault12};
  color: ${theme.color.neutral.background};
  background-color: ${theme.color.accent.backgroundPrimary};
  border-radius: 50%;
`;
