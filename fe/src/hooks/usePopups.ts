import { usePopupStore } from '@/stores/popupStore';

export const useAlert = () => {
  const { isOpen, togglePopup, setCurrentDim } = usePopupStore();

  const openAlert = (source: string) => {
    togglePopup({ type: 'alert', source: source });
    setCurrentDim('alert');
  };

  const closeAlert = () => {
    togglePopup({ type: 'alert', source: null });
    setCurrentDim(null);
  };

  return { isAlertOpen: isOpen.alert.source, openAlert, closeAlert };
};

export const useModal = () => {
  const { isOpen, togglePopup, setCurrentDim } = usePopupStore();

  const openModal = () => {
    togglePopup({ type: 'modal', open: true });
    setCurrentDim('modal');
  };

  const closeModal = () => {
    togglePopup({ type: 'modal', open: false });
    setCurrentDim(null);
  };

  return { isModalOpen: isOpen.modal, openModal, closeModal };
};
