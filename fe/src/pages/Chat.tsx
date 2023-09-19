import { Title } from '@components/common/topBar/Title';
import { TopBar } from '@components/common/topBar/TopBar';
import { Theme, css } from '@emotion/react';

export const Chat: React.FC = () => {
  return (
    <>
      <TopBar>
        <Title>채팅</Title>
      </TopBar>
      <div css={(theme) => pageStyle(theme)}></div>
    </>
  );
};

const pageStyle = (theme: Theme) => {
  return css`
    flex: 1;
    padding: 73px 16px 0;
    margin-bottom: 64px;
    overflow-x: hidden;
    overflow-y: auto;
    background-color: ${theme.color.neutral.background};

    &::-webkit-scrollbar {
      width: 10px;
      background-color: ${theme.color.neutral.background};
    }

    &::-webkit-scrollbar-button {
      width: 0;
      height: 0;
    }

    &::-webkit-scrollbar-thumb {
      width: 4px;
      border-radius: 10px;
      background-color: ${theme.color.neutral.border};
      border: 3px solid ${theme.color.neutral.background};
    }

    &::-webkit-scrollbar-track {
      background-color: transparent;
    }
  `;
};
