import { create } from 'zustand';

type LocationState = {
  isMainLocationSet: boolean;
  setMainLocation: () => void;
};

type RegisteredLocationsState = {
  locationList: LocationType[];
  addLocation: (location: LocationWithQueryType) => void;
  deleteLocation: (id: number) => void;
};

export const useLocationStore = create<LocationState>((set) => ({
  isMainLocationSet: false,
  setMainLocation: () => set({ isMainLocationSet: true }),
}));

export const useRegisteredLocationsStore = create<RegisteredLocationsState>(
  (set) => ({
    locationList: [],
    addLocation: (location: LocationWithQueryType) =>
      set((state) => ({ locationList: addLocationToState(state, location) })),

    deleteLocation: (id: number) =>
      set((state) => ({ locationList: deleteLocationFromState(state, id) })),
  }),
);

const addLocationToState = (
  state: RegisteredLocationsState,
  location: LocationWithQueryType,
) => {
  if (!state.locationList.some((item) => item.id === location.id)) {
    return [
      ...state.locationList,
      { ...location, isMainLocation: state.locationList.length === 0 },
    ];
  }
  return state.locationList;
};

const deleteLocationFromState = (
  state: RegisteredLocationsState,
  id: number,
) => {
  const updatedList = state.locationList.filter(
    (location) => location.id !== id,
  );
  if (updatedList.length > 0) {
    updatedList[0].isMainLocation = true;
  }
  return updatedList;
};
