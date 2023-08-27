import { Button } from '@components/common/button/Button';
import { Theme, css } from '@emotion/react';
import { ReactComponent as Plus } from '@assets/plus.svg';
import { ReactComponent as CircleXFilled } from '@assets/circle-x-filled.svg';
import { usePopupStore } from '@store/PopupStore';

type Props = {
  onToggleContent: (content: 'control' | 'search') => void;
};

export const ControlLocation: React.FC<Props> = ({ onToggleContent }) => {
  const { togglePopup, toggleDim } = usePopupStore();

  const alertOpenHandler = () => {
    togglePopup('alert', true);
    toggleDim('alert', true);
  };

  // TODO mock data 교체 필요
  const modalList = [
    { id: 0, text: '역삼1동' },
    { id: 1, text: '안양99동' },
  ];

  return (
    <div css={ControlLocationStyle}>
      <div className="noticeText">
        <p>지역은 최소 1개,</p>
        <p>최대 2개까지 설정 가능해요.</p>
      </div>
      <div className="buttons">
        {modalList.map((item) => (
          <div className="buttons__location">
            {item.text}
            <CircleXFilled
              className="buttons__location__x-icon"
              onClick={alertOpenHandler}
            />
          </div>
        ))}

        <Button
          className="buttons__add"
          variant="rectangle"
          size="l"
          state="default"
          onClick={() => onToggleContent('search')}
          disabled={false} // TODO disabled조건으로 교체 필요
        >
          <Plus className="buttons__plus-icon" />
          추가
        </Button>
      </div>
    </div>
  );
};

const ControlLocationStyle = (theme: Theme) => {
  return css`
    box-sizing: border-box;
    display: flex;
    padding: 40px 16px;
    flex-direction: column;
    align-items: flex-start;
    gap: 32px;
    align-self: stretch;

    .noticeText {
      width: 100%;
      color: ${theme.color.neutral.text};
      font: ${theme.font.displayDefault12};
      text-align: center;
      font-feature-settings: 'clig' off, 'liga' off;
    }

    .buttons {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 8px;
      align-self: stretch;

      &__location {
        cursor: default;
        display: flex;
        padding: 16px;
        justify-content: space-between;
        align-items: center;
        gap: 4px;
        align-self: stretch;
        border-radius: 8px;
        font: ${theme.font.availableStrong16};
        color: ${theme.color.accent.text};
        background-color: ${theme.color.accent.backgroundPrimary};

        &__x-icon {
          fill: ${theme.color.accent.text};
          cursor: pointer;
          :hover {
            opacity: 0.6;
          }
        }
      }

      &__plus-icon {
        stroke: ${theme.color.accent.textWeak};
      }

      &__add {
        width: 100%;
      }
    }
  `;
};
