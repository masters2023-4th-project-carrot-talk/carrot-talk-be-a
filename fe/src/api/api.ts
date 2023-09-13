import { createQueryParams } from '@/utils/createQueryParams';
import { BASE_URL } from '@constants/path';
import { getAccessToken, getRefreshToken } from '@utils/localStorage';

const fetchData = async (path: string, options?: RequestInit) => {
  const response = await fetch(BASE_URL + path, options);

  if (!response.ok) {
    const errorMessage = await response.text();

    throw new Error(errorMessage);
  }

  if (response.headers.get('content-type') === 'application/json') {
    const data = await response.json();

    return data;
  }
};

export const getMyLocations = () => {
  return fetchData('/api/users/locations', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${getAccessToken()}`,
    },
  });
};

export const deleteLocation = (id: number) => {
  return fetchData(`/api/users/locations/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${getAccessToken()}`,
    },
  });
};

export const patchMainLocation = (id: number) => {
  return fetchData(`/api/users/locations`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getAccessToken()}`,
    },
    body: JSON.stringify({
      locationId: id,
    }),
  });
};

export const checkNickname = async (nickname: string) => {
  return fetchData(`/api/users/nickname?nickname=${nickname}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getAccessToken()}`,
    },
  });
};

export const signup = async (signupInfo: SignupData) => {
  return fetchData('/api/users/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getAccessToken()}`,
    },
    body: JSON.stringify(signupInfo),
  });
};

export const login = async (code: string) => {
  return fetchData(`/api/users/login`, {
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
  return fetchData(`/api/users/logout`, {
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

export const refreshToken = async () => {
  return fetchData(`/api/users/reissue-access-token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      refreshToken: getRefreshToken(),
    }),
  });
};

export const getLocationWithQuery = (query: string) => {
  return fetchData(`/api/locations?keyword=${encodeURIComponent(query)}`);
};

export const getCategories = () => {
  return fetchData('/api/categories');
};

export const getProducts = ({
  locationId,
  categoryId,
  size,
  next = 50,
}: FetchProductsParams) => {
  // /api/products?locationId=1&categoryId=3&next=11&size=10
  // TODO 여기 처리 다른곳으로 분리
  const queryParams = createQueryParams({
    locationId,
    categoryId,
    size,
    next,
  });
  console.log(queryParams, '쿼리확인중');

  return fetchData(`/api/products?${queryParams}`);
};

export const getProductsDetail = (id: number) => {
  console.log('토큰', getAccessToken());

  return fetchData(`/api/products/${id}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${getAccessToken()}`,
    },
  });
};

export const editProductStatus = (id: number, status: ProductStatusType) => {
  return fetchData(`/api/products/${id}/status`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getAccessToken()}`,
    },
    body: JSON.stringify({
      status,
    }),
  });
};

export const deleteProduct = (id: number) => {
  return fetchData(`/api/products/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${getAccessToken()}`,
    },
  });
};

export const editLikeStatus = (id: number) => {
  return fetchData(`/api/products/${id}/like`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getAccessToken()}`,
    },
  });
};
