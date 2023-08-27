import { useState } from 'react';
import { useTheme } from '@emotion/react';
import { Modal } from '@components/common/modal/Modal';
import { usePopupStore } from '@store/PopupStore';
import { ModalHeader } from '@components/common/modal/ModalHeader';
import { ControlLocation } from './content/ControlLocation';
import { SearchLocation } from './content/SearchLocation';
import { Button } from '@components/common/button/Button';
import { ReactComponent as XIcon } from '@assets/x.svg';
import { ReactComponent as ChevronLeft } from '@assets/chevron-left.svg';

export const LocationModal: React.FC = () => {
  const theme = useTheme();
  const { isOpen, isDimOpen, togglePopup, toggleDim } = usePopupStore();
  const [toggleContent, setToggleContent] = useState<'control' | 'search'>(
    'control',
  );

  // TODO 핸들러 이름 상의하기 on + 동작,  동작 + Handler
  const onSelectLocation = (id: number) => {
    console.log('동네 선택:', id);
  };

  const onAddLocation = () => {
    console.log('동네 추가');
  };

  const onDeleteLocation = (id: number) => {
    console.log('동네 삭제:', id);
  };

  const modalCloseHandler = () => {
    togglePopup('modal', false);
    toggleDim('modal', false);
  };

  const onToggleContent = (content: 'control' | 'search') => {
    setToggleContent(content);
  };

  // TODO mock data 교체 필요
  const locationList = [
    { id: 0, text: '역삼1동' },
    { id: 1, text: '역삼2동' },
    { id: 2, text: '역삼3동' },
    { id: 3, text: '역삼4동' },
    { id: 4, text: '역삼5동' },
    { id: 5, text: '역삼6동' },
    { id: 6, text: '역삼7동' },
    { id: 7, text: '역삼8동' },
    { id: 8, text: '역삼9동' },
    { id: 9, text: '역삼10동' },
  ];

  return (
    <Modal
      isOpen={isOpen.modal}
      isDimOpen={isDimOpen.modal}
      header={
        <ModalHeader>
          {toggleContent === 'control' ? (
            <>
              동네 설정
              <Button variant="text" onClick={modalCloseHandler}>
                <XIcon stroke={theme.color.neutral.textStrong} />
              </Button>
            </>
          ) : (
            <>
              <Button variant="text" onClick={() => onToggleContent('control')}>
                <ChevronLeft stroke={theme.color.neutral.textStrong} />
              </Button>
              <Button variant="text" onClick={modalCloseHandler}>
                <XIcon stroke={theme.color.neutral.textStrong} />
              </Button>
            </>
          )}
        </ModalHeader>
      }
    >
      {toggleContent === 'control' ? (
        <ControlLocation onToggleContent={onToggleContent} />
      ) : (
        <SearchLocation locationList={locationList} />
      )}
    </Modal>
  );
};
