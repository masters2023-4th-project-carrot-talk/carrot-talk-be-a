import {
  getChatRoomHistories,
  getChatRoomId,
  getChatRoomInfo,
  getChatRooms,
  getUnreadTotalCount,
} from '@api/api';
import { QUERY_KEY } from '@constants/queryKey';
import { createQueryParams } from '@utils/createQueryParams';
import { useCallback, useMemo } from 'react';
import { useInfiniteQuery, useMutation, useQuery } from 'react-query';

export const useChatRooms = () =>
  useQuery({
    queryKey: QUERY_KEY.chatRooms,
    queryFn: () => getChatRooms(),
    select: (data) => data.data,
  });


//   return { chatRooms, status, error };
// };

export const useUnreadTotalCount = () => {
  // const { chatRooms } = useChatRooms();

  // const unreadTotalCount = chatRooms?.reduce((acc, cur) => {
  //   return acc + cur.unreadChatCount;
  // }, 0); // 메모?

  // return { unreadTotalCount };

  const { data: unreadTotalCount } = useQuery<
    UnreadTotalFromServer,
    unknown,
    number,
    unknown
  >({
    mutationFn: (productId: number) => getChatRoomId(productId),
  });

// export const useChatRooms = () => {
//   const {
//     data: chatRooms,
//     status,
//     error,
//   } = useQuery<ChatRoomsDataFromServer, unknown, ChatRoomType[]>(
//     QUERY_KEY.chatRooms,
//     getChatRooms,
//     {
//       select: (data) => data.data,
//     },
//   );

//   return { chatRooms, status, error };
// };

export const useChatRooms = () =>
  useQuery({
    queryKey: QUERY_KEY.chatRooms,
    queryFn: () => getChatRooms(),
    select: (data) => data.data,
  });

// export const useUnreadTotalCount = () => {
//   // const { chatRooms } = useChatRooms();

//   // const unreadTotalCount = chatRooms?.reduce((acc, cur) => {
//   //   return acc + cur.unreadChatCount;
//   // }, 0); // 메모?

//   // return { unreadTotalCount };

//   const { data: unreadTotalCount } = useQuery<
//     UnreadTotalFromServer,
//     unknown,
//     UnreadTotalCountType
//   >(QUERY_KEY.unreadTotalCount, getUnreadTotalCount, {
//     select: (data) => data.data,
//   });
//   return { unreadTotalCount };
// };

export const useUnreadTotalCount = (isLogin: boolean) =>
  useQuery({
    queryKey: QUERY_KEY.unreadTotalCount,
    queryFn: () => getUnreadTotalCount(),
    select: (data) => data.data.unreadTotalCount,
    // refetchInterval: 1000 * 60,
    enabled: isLogin,
  });

export const useChatRoomHistories = (chatroomId: number) => {
  const fetchHistories = useCallback(
    ({ pageParam }: { pageParam?: number | string }) => {
      const queryParam = createQueryParams({ next: pageParam });
      return getChatRoomHistories(chatroomId, queryParam);
    },
    [chatroomId],
  );

  const query = useInfiniteQuery({
    queryKey: ['chatRoomHistories', chatroomId],
    queryFn: fetchHistories,
    getNextPageParam: (lastPage) => lastPage.data?.nextId,
  });

  const allHistories = useMemo(
    () =>
      query.data?.pages.flatMap((page) => page.data.chattings).reverse() ?? [],
    [query.data?.pages],
  );

  return {
    ...query,
    data: allHistories,
  };
};

export const useChatRoomInfo = (chatroomId: number) => {
  const query = useQuery<ResponseFromServer<ChatRoomInfo>, unknown>({
    queryKey: ['chatRoomInfo', chatroomId],
    queryFn: () => getChatRoomInfo(chatroomId),
  });

  return {
    ...query,
    data: query.data?.data,
  };
};


import {
  getChatRoomHistories,
  getChatRoomId,
  getChatRoomInfo,
  getChatRooms,
  getUnreadTotalCount,
} from '@api/api';
import { QUERY_KEY } from '@constants/queryKey';
import { createQueryParams } from '@utils/createQueryParams';
import { useCallback, useMemo } from 'react';
import { useInfiniteQuery, useMutation, useQuery } from 'react-query';

export const useChatRoomId = () =>
  useMutation<
    ResponseFromServer<{ chatroomId: number }>,
    unknown,
    number,
    unknown
  >({
    mutationFn: (productId: number) => getChatRoomId(productId),
  });

export const useChatRooms = () => {
  const {
    data: chatRooms,
    status,
    error,
  } = useQuery<ChatRoomsDataFromServer, unknown, ChatRoomType[]>(
    QUERY_KEY.chatRooms,
    getChatRooms,
    {
      select: (data) => data.data,
    },
  );

  return { chatRooms, status, error };
};

export const useUnreadTotalCount = () => {
  // const { chatRooms } = useChatRooms();

  // const unreadTotalCount = chatRooms?.reduce((acc, cur) => {
  //   return acc + cur.unreadChatCount;
  // }, 0); // 메모?

  // return { unreadTotalCount };

  const { data: unreadTotalCount } = useQuery<
    UnreadTotalFromServer,
    unknown,
    UnreadTotalCountType
  >(QUERY_KEY.unreadTotalCount, getUnreadTotalCount, {
    select: (data) => data.data,
  });
  return { unreadTotalCount };
};

export const useChatRoomHistories = (chatroomId: number) => {
  const fetchHistories = useCallback(
    ({ pageParam }: { pageParam?: number | string }) => {
      const queryParam = createQueryParams({ next: pageParam });
      return getChatRoomHistories(chatroomId, queryParam);
    },
    [chatroomId],
  );

  const query = useInfiniteQuery({
    queryKey: ['chatRoomHistories', chatroomId],
    queryFn: fetchHistories,
    getNextPageParam: (lastPage) => lastPage.data?.nextId,
  });

  const allHistories = useMemo(
    () =>
      query.data?.pages.flatMap((page) => page.data.chattings).reverse() ?? [],
    [query.data?.pages],
  );

  return {
    ...query,
    data: allHistories,
  };
};

export const useChatRoomInfo = (chatroomId: number) => {
  const query = useQuery<ResponseFromServer<ChatRoomInfo>, unknown>({
    queryKey: ['chatRoomInfo', chatroomId],
    queryFn: () => getChatRoomInfo(chatroomId),
  });

  return {
    ...query,
    data: query.data?.data,
  };
};
