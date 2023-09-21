import { getChatRoomId } from '@api/api';
import { useMutation } from 'react-query';

export const useChatRoomId = () =>
  useMutation<
    ResponseFromServer<{ chatroomId: number }>,
    unknown,
    number,
    unknown
  >({
    mutationFn: (productId: number) => getChatRoomId(productId),
  });
