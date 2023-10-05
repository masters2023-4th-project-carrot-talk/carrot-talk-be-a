import { Heart, Home, News, UserCircle } from '@components/common/icons';
import { PATH } from '@constants/path';
import { Theme, css } from '@emotion/react';
import { NavLink, matchRoutes, useLocation } from 'react-router-dom';
import { NotiCount } from './NotiCount';
import { useNotification } from '@hooks/useNotification';
import { useUnreadTotalCount } from '@queries/chat';
import { useUnreadTotalCountStore } from '@stores/notificationStore';
// import { useEffect } from 'react';
import { useAuth } from '@hooks/useAuth';

export const NavBar: React.FC = () => {
  const { isLogin } = useAuth();
  useNotification(isLogin);
  const { data: count, refetch: refetchUnreadTotalCount } =
    useUnreadTotalCount(isLogin);
  const currentLocation = useLocation();
  const { unreadTotalCount } = useUnreadTotalCountStore();

  console.log(count, ': count');
  console.log(unreadTotalCount, ': unreadTotalCount');

  // useEffect(() => {
  //   if (count) {
  //     setUnreadTotalCount(count);
  //   }
  // }, []);

  // 로그아웃하고나서 자동으로 초기화되는지 초기화해줘야하는지 확인해야함

  const tabs = [
    {
      label: '홈',
      path: PATH.home,
      icon: <Home />,
    },
    {
      label: '판매내역',
      path: PATH.sales,
      icon: <News />,
    },
    {
      label: '관심상품',
      path: PATH.interests,
      icon: <Heart />,
    },
    {
      label: '채팅',
      path: PATH.chat,
      icon: <NotiCount count={unreadTotalCount} />,
    },
    // count={unreadTotalCount}
    {
      label: '내 계정',
      path: PATH.account,
      icon: <UserCircle />,
    },
  ];

  const matchedAllowedRoutes = matchRoutes(tabs, currentLocation) ?? [];
  const isAllowedRoute = matchedAllowedRoutes.length > 0;

  return (
    <>
      {isAllowedRoute && (
        <nav css={(theme) => navStyle(theme)}>
          {tabs.map((tab) => (
            <NavLink
              key={tab.path}
              to={tab.path}
              className="tab"
              onClick={() => {
                refetchUnreadTotalCount();
              }}
            >
              {tab.icon}
              {tab.label}
            </NavLink>
          ))}
        </nav>
      )}
    </>
  );
};

const navStyle = (theme: Theme) => {
  return css`
    position: fixed;
    bottom: 0;

    box-sizing: border-box;
    display: flex;
    width: 393px;
    padding: 8px 16px;
    justify-content: space-between;
    align-items: flex-start;

    border-top: 0.8px solid ${theme.color.neutral.border};
    background-color: ${theme.color.neutral.background};

    .tab {
      display: flex;
      padding: 4px 10px;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      font: ${theme.font.availableStrong10};
      color: ${theme.color.neutral.textWeak};
      text-align: center;
      font-feature-settings: 'clig' off, 'liga' off;

      svg {
        stroke: ${theme.color.neutral.textWeak};
      }

      &:hover {
        opacity: 0.6;
      }
    }

    .active {
      color: ${theme.color.neutral.textStrong};

      svg {
        stroke: ${theme.color.neutral.textStrong};
      }
    }
  `;
};
