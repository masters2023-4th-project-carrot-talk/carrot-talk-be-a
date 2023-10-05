import { Theme, css } from '@emotion/react';

type Props = {
  message: string;
  isMine: boolean;
  isRead: boolean;
  isLast?: boolean;
};

export const Bubble: React.FC<Props> = ({ message, isMine, isRead }) => {
  return (
    <div
      css={(theme) => bubbleStyle(theme, isMine)}
      className={isMine ? 'mine' : ''}
    >
      <div className="bubble">{message}</div>
      {!isRead && isMine && <div className="read-count">1</div>}
    </div>
  );
};

const bubbleStyle = (theme: Theme, isMine: boolean) => {
  return css`
    display: flex;
    flex-direction: ${isMine ? 'row-reverse' : 'row'};
    align-items: center;
    gap: 8px;

    &:not(.mine) + .mine,
    .mine + &:not(.mine) {
      margin-top: 8px;
    }

    .bubble {
      box-sizing: border-box;
      display: inline-flex;
      max-width: 256px;
      min-height: 40px;
      white-space: pre-wrap;
      padding: 8px 16px;
      justify-content: flex-end;
      align-items: center;
      border-radius: 16px;
      background-color: ${isMine
        ? theme.color.accent.backgroundPrimary
        : theme.color.neutral.backgroundBold};

      font: ${theme.font.displayDefault16};
      color: ${isMine
        ? theme.color.accent.text
        : theme.color.neutral.textStrong};
    }

    .read-count {
      font: ${theme.font.displayDefault12};
      color: ${theme.color.neutral.textWeak};
    }
  `;
};
