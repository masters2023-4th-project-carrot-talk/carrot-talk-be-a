import { FC } from 'react';
import { useTheme } from '@emotion/react';
import { Button } from '@components/common/button/Button';
import { usePopupStore } from '@store/PopupStore';
import { Alert } from '@components/common/alert/Alert';
import { AlertContent } from '@components/common/alert/AlertContent';
import { AlertButtons } from '@components/common/alert/AlertButtons';
import { CategoryModal } from '@components/common/modal/categoryModal/CategoryModal';
import { LocationModal } from '@components/common/modal/locationModal/LocationModal';
// 모달, alert동작 test용 페이지
export const ModalTestPage: FC = () => {
  const theme = useTheme();
  const { isOpen, isDimOpen, togglePopup, toggleDim } = usePopupStore();

  const modalOpenHandler = () => {
    togglePopup('modal', true);
    toggleDim('modal', true);
  };

  const alertCloseHandler = () => {
    togglePopup('alert', false);
    toggleDim('alert', false);
  };

  return (
    <div
      css={{
        width: '100%',
        height: '100%',
      }}
    >
      <button onClick={modalOpenHandler}>열어 모달</button>

      {/* <CategoryModal /> */}
      <LocationModal />

      <Alert isOpen={isOpen.alert} isDimOpen={isDimOpen.alert}>
        <AlertContent>'역삼1동'을 삭제하시겠어요?</AlertContent>
        <AlertButtons>
          <Button variant="text" onClick={alertCloseHandler}>
            취소
          </Button>
          <Button
            css={{ color: theme.color.system.warning }}
            variant="text"
            onClick={alertCloseHandler}
          >
            삭제
          </Button>
        </AlertButtons>
      </Alert>
    </div>
  );
};
