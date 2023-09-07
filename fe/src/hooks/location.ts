import {
  deleteLocation,
  getLocationWithQuery,
  getMyLocations,
  patchMainLocation,
} from '@/api/api';
import { QUERY_KEY } from '@/constants/queryKey';
import { useLocationStore } from '@/store/locationStore';
import { useMutation, useQuery, useQueryClient } from 'react-query';

export const useMyLocations = () => {
  const {
    data: locations,
    status,
    error,
  } = useQuery<LocationType[]>(QUERY_KEY.locations, getMyLocations);

  return { locations, status, error }; // TOOD마찬가지로 data.data로 꺼내야함
};

export const useLocationWithQuery = (query: string) => {
  const {
    data: locations,
    status,
    error,
    refetch,
  } = useQuery<
    LocationWithQueryDataFromServer,
    unknown,
    LocationWithQueryType[]
  >([QUERY_KEY.locations, query], () => getLocationWithQuery(query), {
    enabled: false,
    select: (data) => data.data,
  });
  return { locations, status, error, refetch };
};

export const useDeleteLocation = () => {
  const queryClient = useQueryClient();
  const deleteLocationMutation = useMutation(deleteLocation, {
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_KEY.locations);
      // 재조회함
      // 기존에 useQuery로 조회해온 데이터가 key를 통해 다시 조회가 되면서 데이터 변경
      // 드롭다운에도 변경이 반영돼야 하기 때문에 재조회로
    },
  });

  const deleteLocationById = (id: number) => {
    deleteLocationMutation.mutate(id);
  };
  // TODO 에러랑 로딩 추가할지 생각해보기

  return deleteLocationById;
};

export const usePatchMainLocation = (onSuccessCallback?: () => void) => {
  const queryClient = useQueryClient();
  const { setIsMainLocationSet } = useLocationStore();

  const patchMainLocationMutation = useMutation(patchMainLocation, {
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_KEY.locations);
      //재조회를 일으킨 후 콜백함수 실행
      onSuccessCallback?.();
      setIsMainLocationSet();
    },
  });

  const patchMainLocationById = (id: number) => {
    patchMainLocationMutation.mutate(id);
  };

  return patchMainLocationById;
};
