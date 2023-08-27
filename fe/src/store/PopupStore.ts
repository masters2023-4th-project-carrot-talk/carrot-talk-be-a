import { create } from 'zustand';

type PopupState = {
  modal: boolean;
  alert: boolean;
  modalDim: boolean;
  alertDim: boolean;
  openPopup: (type: 'modal' | 'alert') => void;
  closePopup: (type: 'modal' | 'alert') => void;
  openDim: (type: 'modal' | 'alert') => void;
  closeDim: (type: 'modal' | 'alert') => void;
};

export const usePopupStore = create<PopupState>((set) => ({
  modal: false,
  alert: false,
  modalDim: false,
  alertDim: false,
  openPopup: (type) => {
    if (type === 'modal') set({ modal: true });
    else if (type === 'alert') set({ alert: true });
  },
  closePopup: (type) => {
    if (type === 'modal') set({ modal: false });
    else if (type === 'alert') set({ alert: false });
  },
  openDim: (type) => {
    if (type === 'modal') set({ modalDim: true });
    else if (type === 'alert') set({ alertDim: true, modalDim: false });
  },
  closeDim: (type) => {
    if (type === 'modal') set({ modalDim: false });
    else if (type === 'alert') set({ alertDim: false, modalDim: true });
  },
}));
