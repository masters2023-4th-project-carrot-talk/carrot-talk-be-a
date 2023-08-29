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
  /* TODO: navBar 높이와 맞춰 계산 필요함 */
  height: 97%;
  overflow-x: hidden;
  overflow-y: auto;

  &::-webkit-scrollbar {
    display: none;
  }
`;
