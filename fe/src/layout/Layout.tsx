import { Outlet } from 'react-router-dom';
import { NavBar } from '@/components/common/navBar/NavBar';

export const Layout: React.FC = () => {
  return (
    <>
      <header>헤더</header>
      <Outlet />
      <NavBar />
    </>
  );
};
