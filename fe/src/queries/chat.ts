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

export const useUnreadTotalCount = (isLogin: boolean, pathname: string) =>
  useQuery({
    queryKey: [QUERY_KEY.unreadTotalCount, pathname],
    queryFn: () => getUnreadTotalCount(),
    select: (data) => data.data.unreadTotalCount,
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

export const useChatRoomId = () =>
  useMutation<
    ResponseFromServer<{ chatroomId: number }>,
    unknown,
    number,
    unknown
  >({
    mutationFn: (productId: number) => getChatRoomId(productId),
  });
