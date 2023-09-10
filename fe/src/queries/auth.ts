import { checkNickname, login, logout, refreshToken, signup } from '@api/api';
import { QUERY_KEY } from '@constants/queryKey';
import {
  getRefreshToken,
  setAccessToken,
  setLoginInfo,
} from '@utils/localStorage';
import { useMutation, useQuery } from 'react-query';

export const useNicknameCheckQuery = (nickname: string) =>
  useQuery({
    queryKey: [QUERY_KEY.nicknameCheck, nickname],
    queryFn: () => checkNickname(nickname),
    enabled: false,
    retry: false,
  });

export const useSignupMutation = () =>
  useMutation<SignupDataFromServer, unknown, SignupData>({
    mutationFn: (signupInfo: SignupData) => signup(signupInfo),
    onSuccess: ({ data }) => {
      setLoginInfo(data);
    },
    onError: (error) => {
      if (error instanceof Error) {
        throw error;
      }
    },
  });

export const useLoginMutation = (
  onLogin: (data: LoginDataFromServer['data']) => void,
  onLoginFail: () => void,
) =>
  useMutation<LoginDataFromServer, unknown, string>({
    mutationFn: (code: string) => login(code),
    onSuccess: ({ success, data }) => {
      if (!success) {
        onLoginFail();
      }
      onLogin(data);
    },
  });

export const useLogoutMutation = (onLogout: () => void) =>
  useMutation({
    mutationFn: () => logout(),
    onSuccess: () => onLogout(),
  });

export const useTokenRefreshQuery = () => {
  const tokenRefreshQuery = useQuery({
    queryKey: QUERY_KEY.tokenRefresh,
    queryFn: () => refreshToken(),
    refetchInterval: 1000 * 60 * 60,
    refetchIntervalInBackground: true,
    enabled: !!getRefreshToken(),
    select: (data) => {
      if (data.success) {
        return data.data.accessToken;
      }
    },
  });

  if (tokenRefreshQuery.data) {
    setAccessToken(tokenRefreshQuery.data);
  }
};
