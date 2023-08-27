import { Theme, css } from '@emotion/react';

type Props = {
  state: string; //TODO : state 예약중, 판매중, 판매완료
};

export const Label: React.FC<Props> = ({ state }) => {
  return <div css={LabelStyle}>{state}</div>;
};

// TODO state 따라 배경색이 달라야하는지..?
const LabelStyle = (theme: Theme) => {
  return css`
    display: flex;
    height: 22px;
    padding: 10px 8px;
    justify-content: center;
    align-items: center;
    gap: 10px;

    font: ${theme.font.displayDefault12};
    color: ${theme.color.accent.text};
  `;
};
