import { Route, Routes } from 'react-router-dom';
import { css } from '@emotion/react';
import { Layout } from './layout/Layout';
import { Home } from './pages/Home';
import { NotFound } from './pages/NotFound';
import { Sales } from './pages/Sales';
import { Interests } from './pages/Interests';
import { Chat } from './pages/Chat';
import { Auth } from './pages/Auth';

// TODO 경로 상수화
export const AppRoutes: React.FC = () => {
  return (
    <div css={globalStyle}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/*" element={<NotFound />} />
          {/* TODO Private routes 구현 */}
          <Route>
            <Route path="/" element={<Home />} />
            <Route path="/sales" element={<Sales />} />
            <Route path="/interests" element={<Interests />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/auth" element={<Auth />} />
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
