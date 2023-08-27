import { create } from 'zustand';

type PopupState = {
  isOpen: Record<PopupType, boolean>;
  isDimOpen: Record<PopupType, boolean>;
  togglePopup: (type: PopupType, open: boolean) => void;
  toggleDim: (type: PopupType, open: boolean) => void;
};

export const usePopupStore = create<PopupState>((set) => ({
  isOpen: {
    modal: false,
    alert: false,
  },
  isDimOpen: {
    modal: false,
    alert: false,
  },
  togglePopup: (type, open) =>
    set((state) => ({
      ...state,
      isOpen: { ...state.isOpen, [type]: open },
    })),
  toggleDim: (type, open) =>
    set((state) => {
      const otherDim = type === 'modal' ? 'alert' : 'modal';
      return {
        ...state,
        isDimOpen: {
          ...state.isDimOpen,
          [type]: open,
          [otherDim]: !open,
        },
      };
    }),
}));
