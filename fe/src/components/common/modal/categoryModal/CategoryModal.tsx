import { FC } from 'react';
import { useTheme } from '@emotion/react';
import { Modal } from '@components/common/modal/Modal';
import { ModalHeader } from '@components/common/modal/ModalHeader';
import { ReactComponent as XIcon } from '@assets/x.svg';
import { Button } from '@components/common/button/Button';
import { usePopupStore } from '@store/PopupStore';
import { ModalListItem } from '@components/common/modal/ModalListItem';

export const CategoryModal: FC = () => {
  const theme = useTheme();
  const { isOpen, isDimOpen, togglePopup, toggleDim } = usePopupStore();

  // TODO 핸들러 이름 상의하기 on + 동작,  동작 + Handler
  const onSelectCategory = (id: number) => {
    console.log('카테고리 선택:', id);
  };

  const modalCloseHandler = () => {
    togglePopup('modal', false);
    toggleDim('modal', false);
  };

  // TODO mock data 교체 필요
  const modalList = [
    { id: 0, text: '여성잡화' },
    { id: 1, text: '남성패션/잡화' },
    { id: 2, text: '뷰티/미용' },
    { id: 3, text: '스포츠/레저' },
    { id: 4, text: '취미/게임/음반' },
    { id: 5, text: '중고차' },
    { id: 6, text: '티켓/교환권' },
    { id: 7, text: '가공식품' },
    { id: 8, text: '반려동물용품' },
    { id: 9, text: '식물' },
    { id: 10, text: '기타 중고물품' },
    { id: 11, text: '기타 중고물품' },
    { id: 12, text: '기타 중고물품' },
    { id: 13, text: '기타 중고물품' },
    { id: 14, text: '기타 중고물품' },
  ];

  return (
    <Modal
      isOpen={isOpen.modal}
      isDimOpen={isDimOpen.modal}
      header={
        <ModalHeader>
          <span>카테고리</span>

          <Button variant="text" onClick={modalCloseHandler}>
            <XIcon stroke={theme.color.neutral.textStrong} />
          </Button>
        </ModalHeader>
      }
    >
      <ul>
        {modalList.map((item) => (
          <ModalListItem
            text={item.text} // TODO props: data에 따라 수정
            key={item.id}
            onClick={() => {
              onSelectCategory(item.id);
              modalCloseHandler();
            }}
          />
        ))}
      </ul>
    </Modal>
  );
};
