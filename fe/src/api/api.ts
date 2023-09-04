export const BASE_URL = 'http://localhost:5173';
// export const BASE_URL =
//   'http://ec2-52-78-56-188.ap-northeast-2.compute.amazonaws.com:8080';

const fetchData = async (path: string, options?: RequestInit) => {
  console.log('fetchData', path, options);

  const response = await fetch(BASE_URL + path, options);

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  if (response.headers.get('content-type') === 'application/json') {
    const data = response.json();

    return data;
  }

  throw new Error('Content type is not json');
};

export const getMyLocations = () => {
  // TODO 액세스 토큰을 헤더에 담아서 보내야 함
  // TODO const accesToken = null;

  // TODO  if (!accesToken) return {id: 0, name: '역삼 1동', isMainLocation: true};

  return fetchData('/api/users/locations');
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
  console.log(id, '아이디 멈니까');

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
