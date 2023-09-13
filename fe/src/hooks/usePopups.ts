import { usePopupStore } from '@/stores/popupStore';

export const useAlert = () => {
  const { isOpen, currentDim, togglePopup, setCurrentDim } = usePopupStore();

  const openAlert = (source: string) => {
    togglePopup({ type: 'alert', source: source });
    setCurrentDim('alert');
  };

  const closeAlert = () => {
    togglePopup({ type: 'alert', source: null });
    setCurrentDim(null);
  };

  return {
    alertSource: isOpen.alert.source,
    currentDim,
    onOpenAlert: openAlert,
    onCloseAlert: closeAlert,
  };
};

export const useModal = () => {
  const { isOpen, currentDim, togglePopup, setCurrentDim } = usePopupStore();

  const openModal = () => {
    togglePopup({ type: 'modal', open: true });
    setCurrentDim('modal');
  };

  const closeModal = () => {
    togglePopup({ type: 'modal', open: false });
    setCurrentDim(null);
  };

  return {
    isModalOpen: isOpen.modal,
    currentDim,
    onOpenModal: openModal,
    onCloseModal: closeModal,
  };
};
