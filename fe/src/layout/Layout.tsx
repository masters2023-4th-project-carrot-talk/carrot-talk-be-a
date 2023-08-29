import { Theme, css } from '@emotion/react';
import { NavLink, Outlet } from 'react-router-dom';

export const Layout: React.FC = () => {
  return (
    <>
      <div css={contentStyle}>
        <Outlet />
      </div>
      <nav css={(theme) => NavStyle(theme)}>
        <NavLink to="/">홈</NavLink>
        <NavLink to="/sales">판매내역</NavLink>
        <NavLink to="/interests">관심상품</NavLink>
        <NavLink to="/chat">채팅</NavLink>
        <NavLink to="/auth">내 계정</NavLink>
      </nav>
    </>
  );
};

const contentStyle = (theme: Theme) => {
  return css`
    /* TODO: navBar 높이와 맞춰 계산 필요함 */
    height: 97%;
    overflow-x: hidden;
    overflow-y: auto;

    &::-webkit-scrollbar {
      display: none;
    }
  `;
};

const NavStyle = (theme: Theme) => {
  return css`
    .active {
      color: red;
    }
  `;
};
