import { rest } from 'msw';
import { categoryList } from './data/categories';
import { locationsWithQuery } from './data/locations';

let locations: LocationType[] = [
  { id: 1, name: '안양99동', isMainLocation: true },
  { id: 2, name: '안양100동', isMainLocation: false },
];

export const handlers = [
  //내동네
  rest.get(`/api/users/locations`, (_, res, ctx) => {
    console.log('get', locations);
    console.log('재조회가 되니');

    return res(ctx.delay(300), ctx.status(200), ctx.json(locations));
  }),
  // 내동네 삭제
  rest.delete(`/api/users/locations/:id`, (req, res, ctx) => {
    const { id } = req.params;

    locations = locations.filter((location) => location.id !== Number(id));

    // 남아있는 위치가 있다면 첫 번째 위치를 주요 위치로 설정
    if (locations.length > 0) {
      locations[0].isMainLocation = true;
    }
    console.log('delete', locations);

    // 반환 데이터
    const data = {
      success: true,
      data: {
        mainLocationId:
          locations.find((location) => location.isMainLocation)?.id || null,
      },
    };

    return res(ctx.status(200), ctx.json(data));
  }),
  // 내동네 변경
  rest.patch(`/api/users/locations`, (req, res, ctx) => {
    const { locationId } = req.body as { locationId: number };

    // locationId에 해당하는 location이 있는지 확인
    const exists = locations.some((location) => location.id === locationId);

    // 없다면 새로운 location을 추가
    if (!exists) {
      locations.push({
        id: locationId,
        name: `개포${locationId}동`,
        isMainLocation: false,
      });
    }

    locations = locations.map((location) => ({
      ...location,
      isMainLocation: location.id === locationId,
    }));

    console.log(locations, ' 여기도2');

    const data = {
      success: true,
      data: {
        mainLocationId: locationId,
      },
    };

    return res(ctx.status(200), ctx.json(data));
  }),
  //동네 검색
  // 핸들러 설정
  rest.get(`/api/locations`, (req, res, ctx) => {
    const query = req.url.searchParams.get('keyword');

    // 쿼리에 맞는 위치를 필터링
    const filteredLocations = locationsWithQuery.data.filter((location) =>
      location.name.includes(query!),
    );

    return res(ctx.status(200), ctx.json({ data: filteredLocations }));
  }),

  //카테고리
  rest.get(`/api/categories`, (_, res, ctx) => {
    console.log('get', categoryList);

    return res(ctx.delay(200), ctx.status(200), ctx.json(categoryList));
  }),
  //
];
