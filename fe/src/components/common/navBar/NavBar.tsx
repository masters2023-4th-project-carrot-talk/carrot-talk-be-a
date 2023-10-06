import { Heart, Home, News, UserCircle } from '@components/common/icons';
import { PATH } from '@constants/path';
import { Theme, css } from '@emotion/react';
import { useAuth } from '@hooks/useAuth';
import { useNotification } from '@hooks/useNotification';
import { useUnreadTotalCount } from '@queries/chat';
import { useUnreadTotalCountStore } from '@stores/notificationStore';
import { useEffect } from 'react';
import { NavLink, matchRoutes, useLocation } from 'react-router-dom';
import { NotiCount } from './NotiCount';

export const NavBar: React.FC = () => {
  const { isLogin } = useAuth();
  useNotification(isLogin);
  const currentLocation = useLocation();
  const { data: count, isFetching: isCountFetching } = useUnreadTotalCount(
    isLogin,
    currentLocation.pathname,
  );

  const { unreadTotalCount, setUnreadTotalCount } = useUnreadTotalCountStore();

  useEffect(() => {
    if (typeof count === 'number') {
      setUnreadTotalCount(count);
    }
  }, [count]);

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
      icon: <NotiCount count={isCountFetching ? 0 : unreadTotalCount} />,
    },
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
            <NavLink key={tab.path} to={tab.path} className="tab">
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
