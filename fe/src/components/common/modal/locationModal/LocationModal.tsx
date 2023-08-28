import { useState } from 'react';
import { Modal } from '@components/common/modal/Modal';
import { usePopupStore } from '@store/PopupStore';
import { ModalHeader } from '@components/common/modal/ModalHeader';
import { ControlLocation } from './content/ControlLocation';
import { SearchLocation } from './content/SearchLocation';

export const LocationModal: React.FC = () => {
  const { isOpen, isDimOpen, togglePopup, toggleDim } = usePopupStore();
  const [toggleContent, setToggleContent] = useState<'control' | 'search'>(
    'control',
  );

  const onCloseModal = () => {
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
    <Modal isOpen={isOpen.modal} isDimOpen={isDimOpen.modal}>
      {toggleContent === 'control' ? (
        <>
          <ModalHeader title="동네 설정" onCloseModal={onCloseModal} />
          <ControlLocation onToggleContent={onToggleContent} />
        </>
      ) : (
        <>
          <ModalHeader
            onNavigateBack={() => onToggleContent('control')}
            onCloseModal={onCloseModal}
          />
          <SearchLocation locationList={locationList} />
        </>
      )}
    </Modal>
  );
};
