import { useRegisteredLocationsStore } from '@/stores/locationStore';
import {
  useDeleteLocation,
  useMyLocations,
  usePatchMainLocation,
} from '../queries/location';

export const useLocationsByAuth = (
  isLogin: boolean,
  onPatchMainLocation?: () => void,
) => {
  console.log(isLogin, '로그인여부');

  const { serverLocations } = useMyLocations(isLogin);
  const patchMainLocationById = usePatchMainLocation(onPatchMainLocation);
  const deleteLocationById = useDeleteLocation();
  const { lacalLocations, addLocation, deleteLocation } =
    useRegisteredLocationsStore();

  return {
    locations: isLogin ? serverLocations : lacalLocations,
    patchMainLocationById: isLogin ? patchMainLocationById : addLocation,
    deleteLocationById: isLogin ? deleteLocationById : deleteLocation,
  };
};
