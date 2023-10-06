import { create } from 'zustand';

type RegisteredLocationsState = {
  localLocations: LocationType[];
  addLocation: (location: LocationWithQueryType) => void;
  deleteLocation: (id: number) => void;
};

export const useRegisteredLocationsStore = create<RegisteredLocationsState>(
  (set) => ({
    localLocations: [{ id: 1, name: '역삼1동', isMainLocation: true }],
    addLocation: (location: LocationWithQueryType) =>
      set((state) => ({ localLocations: addLocationToState(state, location) })),

    deleteLocation: (id: number) =>
      set((state) => ({ localLocations: deleteLocationFromState(state, id) })),
  }),
);

const addLocationToState = (
  state: RegisteredLocationsState,
  location: LocationWithQueryType,
) => {
  if (!state.localLocations.some((item) => item.id === location.id)) {
    return [...state.localLocations, { ...location, isMainLocation: false }];
  }
  return state.localLocations;
};

const deleteLocationFromState = (
  state: RegisteredLocationsState,
  id: number,
) => {
  const isMainLocationDeleted = state.localLocations.some(
    (location) => location.id === id && location.isMainLocation,
  );

  const updatedList = state.localLocations.filter(
    (location) => location.id !== id,
  );

  if (isMainLocationDeleted) {
    updatedList[0].isMainLocation = true;
  }

  return updatedList;
};
