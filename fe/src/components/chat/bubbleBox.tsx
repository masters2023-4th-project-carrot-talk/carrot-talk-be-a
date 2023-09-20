import { Theme, css } from '@emotion/react';

type Props = {
  isMine: boolean;
};

export const BubbleBox: React.FC<Props> = ({ isMine }) => {
  return <div css={bubbleBoxStyle}></div>;
};

const bubbleBoxStyle = (theme: Theme) => {
  return css`
    display: flex;
    flex-direction: column;
    gap: 8px;
    max-width: 256px;
  `;
};
