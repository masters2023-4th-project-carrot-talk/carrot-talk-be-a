import { deleteLocation, getMyLocations, patchMainLocation, checkNickname } from '@/api/api';
import { QUERY_KEY } from '@/constants/querykey';
import { useQueryClient, useMutation, useQuery } from 'react-query';

export const useMyLocations = () => {
  const {
    data: locations,
    status,
    error,
  } = useQuery<LocationType[]>(QUERY_KEY.locations, getMyLocations);

  return { locations, status, error };
};

export const useDeleteLocation = () => {
  const queryClient = useQueryClient();
  const deleteLocationMutation = useMutation(deleteLocation, {
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_KEY.locations);
      // 재조회함
      // 기존에 useQuery로 조회해온 데이터가 key를 통해 다시 조회가 되면서 기존 데이터가 변경된다.
      // 드롭다운에도 변경이 반영돼야 하기 때문에 재조회로
    },
  });

  const deleteLocationById = (id: number) => {
    deleteLocationMutation.mutate(id);
  };
  // TODO 에러랑 로딩 추가할지 생각해보기

  return deleteLocationById;
};

export const usePatchMainLocation = () => {
  const queryClient = useQueryClient();
  const patchMainLocationMutation = useMutation(patchMainLocation, {
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_KEY.locations);
    },
  });

  const patchMainLocationById = (id: number) => {
    patchMainLocationMutation.mutate(id);
  };

  return patchMainLocationById;
};

export const useCheckNickname = (nickname: string) => {
  const {
    data: nicknameCheck,
    status,
    error,
    refetch: refetchNicknameCheck,
  } = useQuery(QUERY_KEY.nicknameCheck, () => checkNickname(nickname), {
    enabled: false,
    retry: false
  });

  return { nicknameCheck, status, error, refetchNicknameCheck };
}
