import { create } from 'zustand';

type RegisteredLocationsState = {
  locationList: LocationType[];
  addLocation: (location: LocationWithQueryType) => void;
  deleteLocation: (id: number) => void;
};

export const useRegisteredLocationsStore = create<RegisteredLocationsState>(
  (set) => ({
    locationList: [{ id: 1, name: '역삼1동', isMainLocation: true }],
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
    return [...state.locationList, { ...location, isMainLocation: false }];
  } // 초기값이 역삼1동으로 설정돼있음 이후 추가되는 값의 isMain을 false로 지정하여 첫번째 요소가 메인이 되는걸 유지
  return state.locationList;
};

const deleteLocationFromState = (
  state: RegisteredLocationsState,
  id: number,
) => {
  const isMainLocationDeleted = state.locationList.some(
    (location) => location.id === id && location.isMainLocation,
  );

  const updatedList = state.locationList.filter(
    (location) => location.id !== id,
  );

  if (isMainLocationDeleted) {
    updatedList[0].isMainLocation = true;
  }

  return updatedList;
};
