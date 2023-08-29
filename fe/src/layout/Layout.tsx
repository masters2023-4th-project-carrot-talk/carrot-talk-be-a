import { NavBar } from '@/components/common/navBar/NavBar';
import { css } from '@emotion/react';
import { Outlet } from 'react-router-dom';

export const Layout: React.FC = () => {
  return (
    <>
      <div css={contentStyle}>
        <Outlet />
      </div>
      <NavBar />
    </>
  );
};

const contentStyle = css`
  flex: 1;
  overflow-x: hidden;
  overflow-y: auto;

  &::-webkit-scrollbar {
    display: none;
  }
`;
