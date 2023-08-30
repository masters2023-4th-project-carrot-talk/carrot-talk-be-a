import { create } from 'zustand';

type LocationState = {
  mainLocationId: number;
  setMainLocationId: (id: number) => void;
};

export const useLocationStore = create<LocationState>((set) => ({
  mainLocationId: 0,
  setMainLocationId: (id) => set({ mainLocationId: id }),
}));
