import { rest } from 'msw';
let locations: LocationType[] = [
  { id: 1, name: '안양99동', isMainLocation: true },
  { id: 2, name: '안양100동', isMainLocation: false },
];
export const handlers = [
  rest.get(`/users/locations`, (_, res, ctx) => {
    // 딜레이 주기
    return res(ctx.delay(1000), ctx.status(200), ctx.json(locations));
  }),

  // 삭제
  rest.delete(`/users/locations/:id`, (req, res, ctx) => {
    const { id } = req.params;
    const deletedLocation = locations.find(
      (location) => location.id === Number(id),
    );

    // 삭제 처리
    locations = locations.filter((location) => location.id !== Number(id));

    // 만약 삭제된 위치가 주요 위치였다면, 다른 위치를 주요 위치로 설정
    if (deletedLocation?.isMainLocation && locations.length > 0) {
      locations[0].isMainLocation = true; // 첫 번째 요소를 주요 위치로 설정
    }

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

  rest.patch(`/users/locations`, (req, res, ctx) => {
    const { id } = req.body as { id: number };

    // 기존 주요 위치를 일반 위치로 변경
    locations.find((location) => location.isMainLocation)!.isMainLocation =
      false;

    // 새로운 주요 위치를 설정
    locations.find((location) => location.id === id)!.isMainLocation = true;

    // 반환 데이터
    const data = {
      success: true,
      data: {
        mainLocationId: id,
      },
    };

    return res(ctx.status(200), ctx.json(data));
  }),
];
