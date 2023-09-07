import { create } from 'zustand';

type LocationState = {
  isMainLocationSet: boolean;
  setIsMainLocationSet: () => void;
};

export const useLocationStore = create<LocationState>((set) => ({
  isMainLocationSet: false,
  setIsMainLocationSet: () => set({ isMainLocationSet: true }),
}));
