import { create } from 'zustand';

type NotificationState = {
  shouldNotify: boolean;
  setShouldNotify: (shouldNotify: boolean) => void;
};

type UnreadTotalCountState = {
  unreadTotalCount: number;
  setUnreadTotalCount: (unreadTotalCount: number) => void;
};

export const useNotificationStore = create<NotificationState>((set) => ({
  shouldNotify: false,
  setShouldNotify: (shouldNotify: boolean) => set({ shouldNotify }),
}));

// TODO 맨처음에는 서버에서 받아온 값으로 초기화
// TODO 그다음 부터는 서버에서 받아온 값 + notification 이벤트가 있을 때마다 +=1
// 로그아웃시 초기화?
export const useUnreadTotalCountStore = create<UnreadTotalCountState>(
  (set) => ({
    unreadTotalCount: 0,
    setUnreadTotalCount: (unreadTotalCount: number) =>
      set((state) => ({
        unreadTotalCount: state.unreadTotalCount + unreadTotalCount,
      })),
  }),
);
