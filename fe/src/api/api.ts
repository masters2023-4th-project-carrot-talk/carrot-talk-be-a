import { BASE_URL } from '@/constants/path';
import { getAccessToken, getRefreshToken } from '@/utils/localStorage';

const fetchData = async (path: string, options?: RequestInit) => {
  const response = await fetch(BASE_URL + path, options);

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  if (response.headers.get('content-type') === 'application/json') {
    const data = await response.json();

    return data;
  }

  throw new Error('Content type is not json');
};

export const getMyLocations = async () => {
  // TODO 액세스 토큰을 헤더에 담아서 보내야 함
  // TODO const accesToken = null;

  // TODO  if (!accesToken) return {id: 0, name: '역삼 1동', isMainLocation: true};

  return await fetchData('/users/locations');
};

export const deleteLocation = async (id: number) => {
  // TODO 액세스 토큰을 헤더에 담아서 보내야 함
  // TODO const accesToken =

  return await fetchData(`/users/locations/${id}`, {
    method: 'DELETE',
  });
};

export const patchMainLocation = async (id: number) => {
  // TODO 액세스 토큰을 헤더에 담아서 보내야 함
  // TODO const accesToken =

  return await fetchData(`/users/locations`, {
    method: 'PATCH',
    body: JSON.stringify({ id }),
  });
};

export const checkNickname = async (nickname: string) => {
  return await fetchData(`/api/users/nickname?nickname=${nickname}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const signup = async (signupInfo: {
  nickname: string;
  mainLocationId: number;
  subLocationId?: number;
}) => {
  return await fetchData('/api/users/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getAccessToken()}`,
    },
    body: JSON.stringify(signupInfo),
  });
};

export const login = async (code: string) => {
  return await fetchData(`/api/users/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      code: code,
    }),
  });
};

export const logout = async () => {
  return await fetchData(`/api/users/logout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getAccessToken()}`,
    },
    body: JSON.stringify({
      refreshToken: getRefreshToken(),
    }),
  });
};
