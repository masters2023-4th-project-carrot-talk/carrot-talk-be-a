import { css } from '@emotion/react';
import { NavBar } from '@/components/common/navBar/NavBar';
import { Outlet } from 'react-router-dom';
import { useAnimation } from '@/hooks/animation';
import { useLayoutStore } from '@/store/layoutStore';

export const Layout: React.FC = () => {
  const { shouldMove } = useLayoutStore();
  const { handleTransitionEnd, animationTrigger } = useAnimation(shouldMove);

  return (
    <div
      css={() => layoutStyle(animationTrigger)}
      onTransitionEnd={handleTransitionEnd}
    >
      <Outlet />
      <NavBar />
    </div>
  );
};

const layoutStyle = (animationTrigger: boolean) => {
  return css`
    min-height: 100vh;
    transition: 300ms ease;
    transform: translateX(${animationTrigger ? '-392px' : '0px'});
  `;
};
//min-height: 100vh;
