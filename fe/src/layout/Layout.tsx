import { Outlet } from 'react-router-dom';
import { NavBar } from '@/components/common/navBar/NavBar';

export const Layout: React.FC = () => {
  return (
    <>
      <Outlet />
      <NavBar />
    </>
  );
};
