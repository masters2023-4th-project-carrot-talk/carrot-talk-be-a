import { EVENT_NAME } from '@constants/eventName';
import { END_POINT } from '@constants/path';
import {
  useNotificationStore,
  useUnreadTotalCountStore,
} from '@stores/notificationStore';
import { getAccessToken } from '@utils/localStorage';
import { EventSourcePolyfill } from 'event-source-polyfill';
import { useEffect, useRef } from 'react';

export const useNotification = (isLogin: boolean) => {
  const { setShouldNotify } = useNotificationStore();
  const { addUnreadTotalCount, setUnreadCounts } = useUnreadTotalCountStore();

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

            const pattern = /(\w+)\s*=\s*([^,)]+)/g;
            const matches = [...event.data.matchAll(pattern)];
            const result: Record<string, string> = {};

            for (const match of matches) {
              const key = match[1];
              let value = match[2];
              
              if (key === 'content') {
                const colonIndex = value.indexOf(':');
                if (colonIndex !== -1) {
                  value = value.substring(colonIndex + 1).trim();
                }
              }
              result[key] = value;
            }

            const currentDate = new Date();
            const dateString = currentDate.toISOString();

            setUnreadCounts(Number(result.chatroomId), result.content, dateString);

            addUnreadTotalCount(1);
            // setUnreadCounts 호출, 시간 기록
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
