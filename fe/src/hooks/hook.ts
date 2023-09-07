import {
  checkNickname,
  deleteLocation,
  getMyLocations,
  login,
  logout,
  patchMainLocation,
  refreshToken,
  signup,
} from '@/api/api';
import { QUERY_KEY } from '@/constants/queryKey';
import { getRefreshToken, setLoginInfo } from '@/utils/localStorage';
import { useMutation, useQuery, useQueryClient } from 'react-query';

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
  const { data, status, error, refetch } = useQuery(
    [QUERY_KEY.nicknameCheck, nickname],
    () => checkNickname(nickname),
    {
      enabled: false,
      retry: false,
    },
  );

  return { data, status, error, refetch };
};

export const useSignup = () => {
  const { mutate, status, error } = useMutation(
    (userInfo: {
      nickname: string;
      mainLocationId: number;
      subLocationId?: number;
    }) => signup(userInfo),
    {
      onSuccess: ({ data }) => {
        setLoginInfo(data);
      },
      onError: (error) => {
        if (error instanceof Error) {
          throw error;
        }
      },
    },
  );

  return { mutate, status, error };
};

export const useLogin = (
  code: string,
  onLogin: (
    data:
      | {
          isUser: false;
          accessToken: string;
        }
      | {
          isUser: true;
          accessToken: string;
          refreshToken: string;
          user: UserType;
        },
  ) => void,
  onLoginFail: () => void,
) => {
  const { mutate, status, error } = useMutation(() => login(code), {
    onSuccess: ({ success, data }) => {
      if (!success) {
        onLoginFail();
      }
      onLogin(data);
    },
  });

  return { mutate, status, error };
};

export const useLogout = (onLogout: () => void) => {
  const { mutate, status, error } = useMutation(() => logout(), {
    onSuccess: () => {
      onLogout();
    },
  });

  return { mutate, status, error };
};

export const useTokenRefresh = () => {
  const { data, status, error } = useQuery<TokenRefreshType>(
    QUERY_KEY.tokenRefresh,
    refreshToken,
    {
      refetchInterval: 1000 * 60 * 60,
      refetchIntervalInBackground: true,
      enabled: !!getRefreshToken(),
      select: (data) => {
        if (data.success) {
          return data.data.accessToken;
        }
      },
    },
  );

  return { data, status, error };
};
