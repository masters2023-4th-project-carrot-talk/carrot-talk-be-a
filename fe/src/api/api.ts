// export const BASE_URL = 'http://localhost:5173';
export const BASE_URL = 'http://43.201.101.2:8080';
// export const BASE_URL =
//   'http://ec2-52-78-56-188.ap-northeast-2.compute.amazonaws.com:8080';

const fetchData = async (
  path: string,
  isReady?: boolean,
  options?: RequestInit,
) => {
  const BASE_URL = isReady
    ? 'http://43.201.101.2:8080'
    : 'http://localhost:5173';

  const response = await fetch(BASE_URL + path, options);

  if (!response.ok) {
    const errorMessage = await response.text();

    throw new Error(errorMessage);
  }

  if (response.headers.get('content-type') === 'application/json') {
    const data = await response.json();

    return data;
  }

  // throw new Error('Content type is not json');
};

export const getMyLocations = () => {
  // TODO 액세스 토큰을 헤더에 담아서 보내야 함
  // TODO const accesToken = null;

  // TODO  if (!accesToken) return {id: 0, name: '역삼 1동', isMainLocation: true};

  return fetchData('/api/users/locations', false);
};

export const deleteLocation = (id: number) => {
  // TODO 액세스 토큰을 헤더에 담아서 보내야 함
  // TODO const accesToken =

  return fetchData(`/api/users/locations/${id}`, false, {
    method: 'DELETE',
  });
};

export const patchMainLocation = (id: number) => {
  // TODO 액세스 토큰을 헤더에 담아서 보내야 함
  // TODO const accesToken =

  return fetchData(`/api/users/locations`, false, {
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

  return fetchData(
    `/api/locations?keyword=${encodeURIComponent(query)}`,
    false,
  );
};

export const getCategories = () => {
  // TODO 액세스 토큰을 헤더에 담아서 보내야 함
  // TODO const accesToken = null;

  return fetchData('/api/categories', false);
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
  next,
}: FetchProductsParams) => {
  // /api/products?locationId=1&categoryId=3&next=11&size=10
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

  return fetchData(`/api/products?${query.toString()}`, true);
};
