import { FC } from 'react';
import { useTheme } from '@emotion/react';
import { Modal } from '@components/common/modal/Modal';
import { ModalHeader } from '@components/common/modal/ModalHeader';
import { ReactComponent as X } from '@assets/x.svg';
import { Button } from '@components/common/button/Button';
import { useModalStore } from '@stores/PopupStore';
import { useAlertStore } from '@stores/PopupStore';
import { Alert } from '@components/common/alert/Alert';

export const TestPage: FC = () => {
  const theme = useTheme();
  const {
    alert,
    alertDim,
    openAlert,
    closeAlert,
    openAlertDim,
    closeAlertDim,
  } = useAlertStore();
  const {
    modal,
    modalDim,
    openModal,
    closeModal,
    openModalDim,
    closeModalDim,
  } = useModalStore();

  const modalOpenHandler = () => {
    openModal();
    openModalDim();
  };

  const modalCloseHandler = () => {
    closeModal();
    closeModalDim();
  };

  const alertOpenHandler = () => {
    openAlert();
    openAlertDim();
    closeModalDim();
  };

  const alertCloseHandler = () => {
    closeAlert();
    closeAlertDim();
    openModalDim();
  };

  return (
    <div
      css={{
        width: '100%',
        height: '100%',
      }}
    >
      <button onClick={modalOpenHandler}>열어 모달</button>

      <Modal
        isOpen={modal}
        isDimOpen={modalDim}
        header={
          <ModalHeader>
            <span>동네 설정</span>

            <Button variant="text" onClick={modalCloseHandler}>
              <X stroke={theme.color.neutral.textStrong} />
            </Button>
          </ModalHeader>
        }
      >
        <button onClick={alertOpenHandler}>열어 Alert</button>
      </Modal>

      <Alert isOpen={alert} isDimOpen={alertDim}>
        <button onClick={alertCloseHandler}>닫아 Alert</button>
      </Alert>
    </div>
  );
};
