import { FC } from 'react';
import { usePopupStore } from '@store/PopupStore';
import { Alert } from '@components/common/alert/Alert';
import { AlertContent } from '@components/common/alert/AlertContent';
import { AlertButtons } from '@components/common/alert/AlertButtons';
import { CategoryModal } from '@components/common/modal/categoryModal/CategoryModal';
import { LocationModal } from '@components/common/modal/locationModal/LocationModal';
// 모달, alert동작 test용 페이지
export const ModalTestPage: FC = () => {
  const { isOpen, isDimOpen, togglePopup, toggleDim } = usePopupStore();

  const onOpenModal = () => {
    togglePopup('modal', true);
    toggleDim('modal', true);
  };

  const onCloseAlert = () => {
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
      <button onClick={onOpenModal}>열어 모달</button>

      <CategoryModal />

      <LocationModal />

      <Alert isOpen={isOpen.alert} isDimOpen={isDimOpen.alert}>
        <AlertContent>'역삼1동'을 삭제하시겠어요?</AlertContent>
        <AlertButtons buttonText="취소" onCloseAlert={onCloseAlert} />
      </Alert>
    </div>
  );
};
