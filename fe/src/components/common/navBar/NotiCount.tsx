import { css } from '@emotion/react';
import { Message } from '@components/common/icons';
import { CountBadge } from '../countBadge/CountBadge';

export const NotiCount: React.FC = () => {
  // TOOD count 받아오기
  const isMessageNoti = true;
  //TODO 추후 교체합니다
  //TODO 개수 어떤 주기로 갱신? 전역 저장?

  return (
    <div css={notiCountStyle}>
      {isMessageNoti && <CountBadge size="s" count={1} className="count-box" />}
      <Message />
    </div>
  );
};

const notiCountStyle = () => {
  return css`
    position: relative;
    box-sizing: border-box;

    display: flex;
    align-items: center;
    justify-content: center;

    .count-box {
      position: absolute;

      top: -5px;
      right: -5px;
    }
  `;
};
