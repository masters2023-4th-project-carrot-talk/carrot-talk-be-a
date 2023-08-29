import { FC } from 'react';
import { Theme, css } from '@emotion/react';

type Props = {
  item: any; // TODO : item의 타입 변경
  isUser: boolean;
};

/* 
title 글제목
location 역삼1동
dot ·
createdAt 2시간 전
stateBadge 예약중
price 가격


icon dots 내가 글 주인일때만
icon message + 카운터 < 0이상 있을때만
icon heart + 카운터 < 0이상 있을때만  

*/

export const ListItem: FC<Props> = ({ item, isUser }) => {
  return <li css={listItemStyle}></li>;
};

const listItemStyle = (theme: Theme) => {
  return css`
    display: flex;
    padding: 16px 0px;
    align-items: flex-start;
    gap: 16px;
    align-self: stretch;

    li:not(:last-child) {
      border-bottom: 1px solid ${theme.color.neutral.border};
    }
  `;
};
