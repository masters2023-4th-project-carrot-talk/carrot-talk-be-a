import { BASE_URL } from '@/constants/path';
import { getAccessToken, getRefreshToken } from '@/utils/localStorage';

const fetchData = async (
  path: string,
  options?: RequestInit,
) => {


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
  // TODO 액세스 토큰을 헤더에 담아서 보내야 함
  // TODO const accesToken = null;

  // TODO  if (!accesToken) return {id: 0, name: '역삼 1동', isMainLocation: true};

  return fetchData('/api/users/locations', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${getAccessToken()}`,
    }
  });
};

export const deleteLocation = (id: number) => {
  // TODO 액세스 토큰을 헤더에 담아서 보내야 함
  // TODO const accesToken =

  return fetchData(`/api/users/locations/${id}`, {
    method: 'DELETE',
  });
};

export const patchMainLocation = (id: number) => {
  // TODO 액세스 토큰을 헤더에 담아서 보내야 함
  // TODO const accesToken =

  return fetchData(`/api/users/locations`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
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

export const signup = async (signupInfo: {
  nickname: string;
  mainLocationId: number;
  subLocationId?: number;
}) => {
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
  // /api/locations?keyword=”강남구”

  // TODO 액세스 토큰을 헤더에 담아서 보내야 함
  // TODO const accesToken =

  return fetchData(`/api/locations?keyword=${encodeURIComponent(query)}`);
};

export const getCategories = () => {
  // TODO 액세스 토큰을 헤더에 담아서 보내야 함
  // TODO const accesToken = null;

  return fetchData('/api/categories');
};

// export const getProducts = ({ locationId, categoryId, next, size }) => {
//   // /api/products?locationId=1&categoryId=3&next=11&size=10

//   // TODO 액세스 토큰을 헤더에 담아서 보내야 함
//   // TODO const accesToken = null;

//   // TODO  if (!accesToken) return 역삼1동의 상품들을 가져옴
//   const queryParams = new URLSearchParams({
//     locationId,
//     categoryId,
//     next,
//     size,
//   }).toString();
//   return fetchData(`/api/products?nextId=${queryParams}`);
// };

export const getProducts = ({
  locationId,
  categoryId,
  size,
  next = 50,
}: FetchProductsParams) => {
  console.log(next, 'next확인중');

  // /api/products?locationId=1&categoryId=3&next=11&size=10
  // TODO 여기 처리 다른곳으로 분리
  const query = new URLSearchParams();

  if (locationId !== undefined && locationId !== null) {
    query.append('locationId', String(locationId));
  }
  if (categoryId !== undefined && categoryId !== null) {
    query.append('categoryId', String(categoryId));
  }
  if (size !== undefined && size !== null) {
    query.append('size', String(size));
  }
  if (next !== undefined && next !== null) {
    query.append('next', String(next));
  }

  console.log(query.toString(), '쿼리확인중');

  return fetchData(`/api/products?${query.toString()}`);
};
