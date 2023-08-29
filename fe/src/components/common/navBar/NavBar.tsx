import { Theme, css } from '@emotion/react';
import { NavLink } from 'react-router-dom';
import { ReactComponent as Home } from '@assets/home.svg';
import { ReactComponent as News } from '@assets/news.svg';
import { ReactComponent as Heart } from '@assets/heart.svg';
import { ReactComponent as Message } from '@assets/message.svg';
import { ReactComponent as MessageNoti } from '@assets/message-noti.svg';
import { ReactComponent as UserCircle } from '@assets/user-circle.svg';
import { PATH } from '@/constants/path';

export const NavBar: React.FC = () => {
  const isMessageNoti = false; //TODO 추후 교체합니다

  const messageTabIcon = isMessageNoti ? <MessageNoti /> : <Message />;

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
      icon: messageTabIcon,
    },
    {
      label: '내 계정',
      path: PATH.auth,
      icon: <UserCircle />,
    },
  ];

  return (
    <>
      <nav css={(theme) => navStyle(theme)}>
        {tabs.map((tab) => (
          <NavLink key={tab.path} to={tab.path} className="tab">
            {tab.icon}
            {tab.label}
          </NavLink>
        ))}
      </nav>
    </>
  );
};

const navStyle = (theme: Theme) => {
  return css`
    position: absolute;
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
