import {
  deleteLocation,
  getLocationWithQuery,
  getMyLocations,
  patchMainLocation,
} from '@/api/api';
import { QUERY_KEY } from '@/constants/queryKey';
import {
  useLocationStore,
  useRegisteredLocationsStore,
} from '@/store/locationStore';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useAuth } from './useAuth';

export const useMyLocations = () => {
  const { isLogin, accessToken } = useAuth();

  const {
    data: locations,
    status,
    error,
  } = useQuery<LocationDataFromServer, unknown, LocationType[]>(
    QUERY_KEY.locations,
    () => getMyLocations(accessToken),
    {
      select: (data) => data.data,
      enabled: isLogin,
    },
  );

  if (!isLogin) {
    return {
      locations: [{ id: 0, name: '역삼 1동', isMainLocation: true }],
      status: 'idle',
      error: null,
    };
  }

  return { locations, status, error };
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
  const { accessToken } = useAuth();
  const queryClient = useQueryClient();
  const deleteLocationMutation = useMutation<
    void,
    unknown,
    [number, string | null]
  >(([id, accessToken]) => deleteLocation(id, accessToken), {
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_KEY.locations);
    },
  });

  const deleteLocationById = (id: number) => {
    deleteLocationMutation.mutate([id, accessToken]);
  };

  return deleteLocationById;
};

export const usePatchMainLocation = (onSuccessCallback?: () => void) => {
  // 아 회원가입 도중에 메인 지역을 바꾸는 경우는????????????
  // 왔다리 갔다리 클릭하고있을때 색을 변경해줘야함.

  const { locationList, setAddLocation } = useRegisteredLocationsStore();
  const { isLogin, accessToken } = useAuth();
  const queryClient = useQueryClient();
  const { setIsMainLocationSet } = useLocationStore();

  type LocationArgument = typeof isLogin extends true
    ? LocationType
    : LocationWithQueryType;

  const patchMainLocationMutation = useMutation<
    void,
    unknown,
    [number, string | null]
  >(([id, accessToken]) => patchMainLocation(id, accessToken), {
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_KEY.locations);
      //재조회를 일으킨 후 콜백함수 실행
      onSuccessCallback?.();
      setIsMainLocationSet();
    },
  });

  const patchMainLocationById = (location: LocationArgument) => {
    if (isLogin) {
      // 로그인이 된 유저라면 서버에 요청 보내서 데이터를 받아옴
      patchMainLocationMutation.mutate([
        (location as LocationType).id,
        accessToken,
      ]);
    } else {
      // 로그인 안된 유저라면 store에 저장하고 사용처에서 locationList 배열을 렌더링하도록 함
      setAddLocation(location as LocationType);
    }
  };

  return { patchMainLocationById, locationList };
};
