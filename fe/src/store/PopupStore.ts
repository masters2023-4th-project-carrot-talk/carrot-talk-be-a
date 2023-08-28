import { create } from 'zustand';

type PopupState = {
  isOpen: Record<PopupType, boolean>;
  currentDim: PopupType | null;
  togglePopup: (type: PopupType, open: boolean) => void;
  toggleDim: (type: PopupType | null) => void;
};

export const usePopupStore = create<PopupState>((set) => ({
  isOpen: {
    modal: false,
    alert: false,
  },
  currentDim: null,
  togglePopup: (type, open) =>
    set((state) => ({
      ...state,
      isOpen: { ...state.isOpen, [type]: open },
    })),
  toggleDim: (type) => set({ currentDim: type }),
}));
