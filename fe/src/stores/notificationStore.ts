import { create } from 'zustand';

type NotificationState = {
  shouldNotify: boolean;
  setShouldNotify: (shouldNotify: boolean) => void;
};

type AlarmMessage = {
  lastMessage: string;
  unreadCount: number;
  updatedAt: string;
};

type UnreadCounts = {
  [chatroomId: number]: AlarmMessage;
};

type UnreadTotalCountState = {
  unreadTotalCount: number;
  unreadCounts: UnreadCounts;
  setUnreadTotalCount: (unreadTotalCount: number) => void;
  addUnreadTotalCount: (incrementValue: number) => void;
  setUnreadCounts: (
    chatroomId: number,
    lastMessage: string,
    updatedAt: string,
  ) => void;
  initializeUnreadCounts: () => void;
};

export const useNotificationStore = create<NotificationState>((set) => ({
  shouldNotify: false,
  setShouldNotify: (shouldNotify: boolean) => set({ shouldNotify }),
}));

export const useUnreadTotalCountStore = create<UnreadTotalCountState>(
  (set) => ({
    unreadTotalCount: 0,
    unreadCounts: {},
    setUnreadTotalCount: (unreadTotalCount: number) =>
      set({ unreadTotalCount }),
    addUnreadTotalCount: (incrementValue: number) =>
      set((state) => ({
        unreadTotalCount: (state.unreadTotalCount += incrementValue),
      })),
    setUnreadCounts: (
      chatroomId: number,
      lastMessage: string,
      updatedAt: string,
    ) =>
      set((state) => ({
        unreadCounts: {
          ...state.unreadCounts,
          [chatroomId]: {
            lastMessage,
            updatedAt,
            unreadCount: state.unreadCounts[chatroomId]
              ? state.unreadCounts[chatroomId].unreadCount + 1
              : 1,
          },
        },
      })),
    initializeUnreadCounts: () => set({ unreadCounts: {} }),
  }),
);
