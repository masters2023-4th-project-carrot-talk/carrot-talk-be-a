import { create } from 'zustand';

type LocationState = {
  mainLocationId: number | null;
  setMainLocationId: (id: number | null) => void;
};

export const useLocationStore = create<LocationState>((set) => ({
  mainLocationId: null,
  setMainLocationId: (id) => set({ mainLocationId: id }),
}));
