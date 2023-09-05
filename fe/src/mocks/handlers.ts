import { rest } from 'msw';
import { token, users } from './data/users';

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

  rest.get('/api/users/nickname', (req, res, ctx) => {
    const query = req.url.searchParams;
    const nickname = query.get('nickname');

    const isUser = users.some((user) => user.nickname === nickname);

    if (isUser) {
      const data = {
        success: false,
        errorCode: {
          status: 409,
          message: '같은 닉네임이 존재합니다.',
        },
      };

      return res(ctx.status(200), ctx.json(data));
    }

    const data = {
      success: true,
    };

    return res(ctx.status(200), ctx.json(data));
  }),

  rest.post('/api/users/signup', async (req, res, ctx) => {
    const { nickname, mainLocationId, subLocationId } = await req.json();

    const newUser = {
      id: users.length + 1,
      nickname,
      mainLocationId,
      subLocationId,
      imageUrl:
        'https://i.pinimg.com/originals/3a/22/bd/3a22bdb8957e81ed560635383d483e97.png',
    };

    users.push(newUser);

    const data = {
      success: true,
      data: {
        isUser: true,
        accessToken: token,
        refreshToken: token,
        user: {
          id: newUser.id,
          nickname: newUser.nickname,
          imageUrl: newUser.imageUrl,
        },
      },
    };

    return res(ctx.status(200), ctx.json(data));
  }),

  rest.post('/api/users/login', (_, res, ctx) => {
    const data = {
      success: true,
      data: {
        isUser: false,
        accessToken: 'accessTokenForSignup',
      },
    };

    return res(ctx.status(200), ctx.json(data));
  }),

  rest.post('/api/users/logout', async (req, res, ctx) => {
    const authorization = req.headers.get('Authorization');
    const body = await req.json();

    if (authorization !== `Bearer ${token}` || body?.refreshToken !== token) {
      return res(ctx.status(200), ctx.json({ success: false }));
    }

    return res(ctx.status(200), ctx.json({ success: true }));
  }),
];
