import { create } from 'zustand';

type LocationState = {
  isMainLocationSet: boolean;
  setIsMainLocationSet: () => void;
};

export const useLocationStore = create<LocationState>((set) => ({
  isMainLocationSet: false,
  setIsMainLocationSet: () => set({ isMainLocationSet: true }),
}));

type RegisteredLocationsState = {
  locationList: LocationType[];
  setAddLocation: (location: LocationType) => void;
};

export const useRegisteredLocationsStore = create<RegisteredLocationsState>(
  (set) => ({
    locationList: [],
    setAddLocation: (location: LocationType) =>
      set((state) => ({ locationList: [...state.locationList, location] })),
  }),
);
