import { NavLink, Outlet } from 'react-router-dom';
import { Theme, css } from '@emotion/react';

export const Layout: React.FC = () => {
  return (
    <>
      <header>헤더</header>
      <Outlet />
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

const NavStyle = (theme: Theme) => {
  return css`
    .active {
      color: red;
    }
  `;
};
