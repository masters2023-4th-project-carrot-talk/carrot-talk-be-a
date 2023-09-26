import { END_POINT } from '@constants/path';
import { EventSourcePolyfill, NativeEventSource } from 'event-source-polyfill';
import { useEffect } from 'react';
import { useAuth } from './useAuth';
import { getAccessToken } from '@utils/localStorage';
import {
  useNotificationStore,
  useUnreadTotalCountStore,
} from '@stores/notificationStore';
import { EVENT_NAME } from '@constants/eventName';
import { useUnreadTotalCount } from '@queries/chat';

export const useNotification = () => {
  const { isLogin } = useAuth();
  const { setShouldNotify } = useNotificationStore();
  const { setUnreadTotalCount } = useUnreadTotalCountStore();

  const EventSource = EventSourcePolyfill;

  useEffect(() => {
    if (!isLogin) return;

    const connectSSE = () => {
      try {
        const eventSource = new EventSource(
          `${import.meta.env.VITE_BASE_URL}/${END_POINT.notify}`,
          {
            headers: {
              Authorization: `Bearer ${getAccessToken()}`,
            },
            withCredentials: true, // TODO 백에 여쭤보기
          },
        );

        eventSource.onmessage = async (event) => {
          //
          console.log('now noti event : ', event);
          const response = await event.data;
          console.log('now noti response : ', response);

          // if (!response.includes(EVENT_NAME.connect)) setShouldNotify(true); // 더미데이터에 대한 필터, 더미데이터가 아닌 응답은 알림으로 처리해야함
          setShouldNotify(true); // 최초 연결 성공시 noti on => count를 받아옴

          if (response.includes(EVENT_NAME.notification)) {
            setUnreadTotalCount(1);
          }

          // TODO 토스트 메시지로 인앱 알림
          // TODO 전체 안읽은 메세지 개수 업데이트
          // TODO 노티마다 우리가 +=1

          // TODO 채팅방 목록 재정렬
          // TODO 순서가 동일하다면 굳이 재렌더링? memo callback 살펴보기

          // 메시지 전송 실패시 < 이 경우에 대한 event가 추가될 수 있음

          // - (페이지 이동할 때, 주기적으로)API를 호출해서 읽지 않은 채팅 개수를 **동기화** 한다.
          // stale을 infinity로?
          // - 이후 채팅 개수 업데이트는 Notification 이벤트로 받은 데이터로 진행한다.
          // 페이지 이동시랑 notification이벤트랑 겹치면??
        };

        eventSource.onerror = (error) => {
          console.log('error : ', error);
          // - EventSource 객체 생성 후 연결 중 문제 발생
          // - 서버로부터 초기 연결을 시도하는 중에 문제가 발생했을 때.
          // - 연결 후 서버와의 연결이 끊어졌을 때 (예: 서버 다운, 네트워크 문제 등).
          // - 서버에서 올바르지 않은 데이터 포맷이나 응답을 보냈을 때.
          // - CORS 문제로 인해 브라우저가 연결을 거부했을 때.
        };
      } catch (error) {
        console.log('error : ', error);
        // EventSource 객체 생성 중 예외 발생시
      }
    };

    connectSSE();
    return () => {
      console.log('disconnect');
      // eventSource.close();
      // setShouldNotify(false);
    };
  }, [isLogin, EventSource]);
};

// NativeEventSource제거하니까 header에 빨간줄 안뜸

//   const eventSource =
// typeof window !== 'undefined'
//   ? NativeEventSource || EventSourcePolyfill
//   : null;
