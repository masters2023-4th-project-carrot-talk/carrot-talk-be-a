import { Title } from '@/components/common/topBar/Title';
import { TopBar } from '@/components/common/topBar/TopBar';
import { Theme, css } from '@emotion/react';

export const Auth: React.FC = () => {
  return (
    <>
      <TopBar>
        <Title>내 계정</Title>
      </TopBar>
      <div css={pageStyle}></div>
    </>
  );
};

const pageStyle = (theme: Theme) => {
  return css`
    flex: 1;
  `;
};
