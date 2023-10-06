import { css } from '@emotion/react';
import { Message } from '@components/common/icons';
import { CountBadge } from '../countBadge/CountBadge';
import { useNotificationStore } from '@stores/notificationStore';

type Props = {
  count?: number;
};

export const NotiCount: React.FC<Props> = ({ count }) => {
  const { shouldNotify } = useNotificationStore();

  return (
    <div css={notiCountStyle}>
      {shouldNotify && count !== 0 && (
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
