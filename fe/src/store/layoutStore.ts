import { create } from 'zustand';

type LayoutState = {
  shouldMove: boolean;
  setshouldMove: () => void;
};

export const useLayoutStore = create<LayoutState>((set, get) => ({
  shouldMove: false,
  setshouldMove: () => {
    const currentShouldMove = get().shouldMove;
    set({ shouldMove: !currentShouldMove });
  },
}));
