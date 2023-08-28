import { Theme, css } from '@emotion/react';
import { Dim } from './Dim';

type Props = {
  isOpen: boolean;
  isDimOpen: boolean;
  children: React.ReactNode;
};

export const Modal: React.FC<Props> = ({ isOpen, isDimOpen, children }) => {
  return (
    <>
      {isOpen && (
        <div css={ModalStyle}>
          <Dim isOpen={isDimOpen} />
          <div className="modal">{children}</div>
        </div>
      )}
    </>
  );
};

const ModalStyle = (theme: Theme) => {
  return css`
    display: flex;
    width: 393px;
    height: 852px;
    position: absolute;
    inset: 0;

    z-index: 105;
    justify-content: center;
    align-items: center;

    .modal {
      position: relative;
      z-index: 110;
      display: flex;
      width: 320px;
      height: 700px;
      box-sizing: border-box;
      flex-direction: column;
      align-items: flex-start;
      flex-shrink: 0;
      border-radius: 16px;
      background-color: ${theme.color.neutral.background};
      box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    }

    ul {
      display: flex;
      padding: 0px 24px;
      flex-direction: column;
      align-items: flex-start;
      align-self: stretch;
      overflow-y: scroll;

      &::-webkit-scrollbar {
        display: none;
      }
    }

    li:not(:last-child) {
      border-bottom: 1px solid ${theme.color.neutral.border};
    }
  `;
};
