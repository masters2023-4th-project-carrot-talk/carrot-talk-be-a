import { Route, Routes } from 'react-router-dom';
import { css } from '@emotion/react';
import { Layout } from './layout/Layout';
import { NotFound } from './pages/NotFound';
import { Home } from './pages/Home';
import { Sales } from './pages/Sales';
import { Interests } from './pages/Interests';
import { Chat } from './pages/Chat';
import { Auth } from './pages/Auth';
import { PATH } from './constants/path';

// TODO Private routes 구현
export const AppRoutes: React.FC = () => {
  return (
    <div css={globalStyle}>
      <Routes>
        {/* TODO: 하단바 X - 카테고리 페이지 */}
        {/* TODO: 하단바 X - 회원가입 페이지(리다이렉트) */}
        {/* TODO: 하단바 O - 등록페이지 / 인증 필요 */}
        {/* TODO: 하단바 O - 상세페이지 / 인증 필요*/}
        {/* TODO: 하단바 O - 채팅페이지 / 인증 필요 */}
        <Route element={<Layout />}>
          <Route path={PATH.notFound} element={<NotFound />} />

          <Route>
            <Route path={PATH.home} element={<Home />} />
            <Route path={PATH.sales} element={<Sales />} />
            {/* 인증필요 */}
            <Route path={PATH.interests} element={<Interests />} />
            {/* 인증필요 */}
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
