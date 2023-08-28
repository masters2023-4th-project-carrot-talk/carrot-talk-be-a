import { Route, Routes } from 'react-router-dom';
import { css } from '@emotion/react';
import { Layout } from './layout/Layout';
import { Home } from './pages/Home';
import { NotFound } from './pages/NotFound';
import { Sales } from './pages/Sales';
import { Interests } from './pages/Interests';
import { Chat } from './pages/Chat';
import { Auth } from './pages/Auth';
import { PATH } from './constants/path';

// TODO 경로 상수화
export const AppRoutes: React.FC = () => {
  return (
    <div css={globalStyle}>
      <Routes>
        <Route element={<Layout />}>
          <Route path={PATH.notFound} element={<NotFound />} />
          {/* TODO Private routes 구현 */}
          <Route>
            <Route path={PATH.home} element={<Home />} />
            <Route path={PATH.sales} element={<Sales />} />
            <Route path={PATH.interests} element={<Interests />} />
            <Route path={PATH.chat} element={<Chat />} />
            <Route path={PATH.auth} element={<Auth />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
};

const globalStyle = css`
  width: 393px;
  height: 852px;
  margin: auto;
  border: 1px solid black;
`;
