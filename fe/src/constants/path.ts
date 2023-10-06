export const PATH = {
  home: '/',
  sales: '/sales',
  interests: '/interests',
  chat: '/chat',
  chatRoom: '/chat-room',
  account: '/account',
  redirect: '/oauth/redirect',
  signup: '/signup',
  notFound: '/*',
  detail: '/product',
  newProduct: '/product/new',
  editProduct: '/product/:id/edit',
  invalidAccess: '/invalid-access',
};

export const END_POINT = {
  notify: `/api/notification/subscribe`,
  signup: `/api/users/signup`,
  login: `/api/users/login`,
  logout: `/api/users/logout`,
  refreshToken: `/api/users/reissue-access-token`,
  categories: `/api/categories`,
  imageUpload: `/api/images`,
  chatroom: '/api/chatrooms',
  unreadTotalCount: `/api/chatrooms/unread-total-count`,
  products: (query?: string) => `/api/products${query ? `?${query}` : ''}`,
  productDetail: (id: number) => `/api/products/${id}`,
  productStatusEdit: (id: number) => `/api/products/${id}/status`,
  productDelete: (id: number) => `/api/products/${id}`,
  productLike: (id: number) => `/api/products/${id}/like`,
  locations: (id?: number) =>
    id ? `/api/users/locations/${id}` : '/api/users/locations',
  locationsOf: (query: string) => `/api/locations?keyword=${query}`,
  nicknameCheck: (nickname: string) =>
    `/api/users/nickname?nickname=${nickname}`,
  chatroomHistories: (chatroomId: number, query?: string) =>
    `/api/chatrooms/${chatroomId}${query ? `?${query}` : ''}`,
  chatroomInfo: (chatroomId: number) => `/api/chatrooms/${chatroomId}/product`,
};

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${
  import.meta.env.VITE_KAKAO_REST_API_KEY
}&redirect_uri=${
  import.meta.env.VITE_ORIGIN_URL + PATH.redirect
}&response_type=code&scope=profile_image`;

export const BASE_URL = import.meta.env.VITE_BASE_URL;
