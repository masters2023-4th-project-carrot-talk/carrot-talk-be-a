import { css } from '@emotion/react';
import { Message } from '@components/common/icons';
import { CountBadge } from '../countBadge/CountBadge';
import { useNotificationStore } from '@stores/notificationStore';
import { useUnreadTotalCount } from '@queries/chat';

export const NotiCount: React.FC = () => {
  const { shouldNotify } = useNotificationStore(); // login이 포함돼있음
  // TOOD count 받아오기
  const { data: count } = useUnreadTotalCount();
  const isMessageNoti = true;
  // const isMessageNoti = shouldNotify;
  //TODO 추후 교체합니다
  //TODO 개수 어떤 주기로 갱신? 전역 저장?

  return (
    <div css={notiCountStyle}>
      {isMessageNoti && count && (
        <CountBadge size="s" count={count} className="count-box" />
      )}
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
