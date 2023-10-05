import { END_POINT } from '@constants/path';
import { EventSourcePolyfill } from 'event-source-polyfill';
import { useEffect, useRef } from 'react';
import { getAccessToken } from '@utils/localStorage';
import {
  useNotificationStore,
  useUnreadTotalCountStore,
} from '@stores/notificationStore';
import { EVENT_NAME } from '@constants/eventName';

export const useNotification = (isLogin: boolean) => {
  const { setShouldNotify } = useNotificationStore();
  const { addUnreadTotalCount, addUnreadChatDataById } =
    useUnreadTotalCountStore();

  const EventSource = EventSourcePolyfill;
  const eventSourceRef = useRef<EventSource | null>(null);

  useEffect(() => {
    if (!isLogin) return;

    const connectSSE = () => {
      try {
        eventSourceRef.current = new EventSource(
          `${import.meta.env.VITE_BASE_URL}${END_POINT.notify}`,
          {
            headers: {
              Authorization: `Bearer ${getAccessToken()}`,
            },

            withCredentials: true,
            heartbeatTimeout: 600000,
          },
        );

        eventSourceRef.current.addEventListener(EVENT_NAME.connect, (event) => {
          // todo 둘중하나 지우기
          console.log('connect on addEventListener: ', event);
          setShouldNotify(true);
        });

        eventSourceRef.current.addEventListener(
          EVENT_NAME.notification,
          (event) => {
            console.log('채팅 내용 : ', event);

            const response = event.data;
            const regex = /chatroomId=(\d+).*title=(.*), content=.*: (\d+)/;
            const match = response.match(regex);

            const currentDate = new Date();
            const isoString = currentDate.toISOString();
            console.log(isoString);

            if (match) {
              console.log('chatroomId:', match[1]); // 131

              console.log('content:', match[3]); // 111
              addUnreadChatDataById(match[1], 1, isoString, match[3]);
            }

            addUnreadTotalCount(1);
          },
        );

        // eventSourceRef.current.onopen = () => { // A팀일때 테스트용 (설리에게 EVENT_NAME.connect 추가 요청)
        //   // todo 둘중하나 지우기
        //   console.log('connect on ONOPEN');
        //   setShouldNotify(true);
        // };

        eventSourceRef.current.onerror = (error) => {
          console.log('error on connect: ', error);
          // eventSourceRef.current?.close(); 여기서 닫으면 안됨
        };
      } catch (error) {
        console.log('notify error: ', error);
        return;
      }
    };

    connectSSE();

    return () => {
      console.log('disconnect');

      eventSourceRef.current?.close();

      setShouldNotify(false);
    };
  }, [isLogin, EventSource]);
};
