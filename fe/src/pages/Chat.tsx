import { ChatItem, SkeletonChatItem } from '@components/common/chat/ChatItem';
import { Title } from '@components/common/topBar/Title';
import { TopBar } from '@components/common/topBar/TopBar';
import { PATH } from '@constants/path';
import { Theme, css } from '@emotion/react';
import { useChatRooms } from '@queries/chat';
import { useNavigate } from 'react-router-dom';

export const Chat: React.FC = () => {
  const { data: chatRooms, status } = useChatRooms(); // TODO
  const navigate = useNavigate();

  const onEnterChat = (chatroomId: number) => {
    // TODO chatcount지우기?
    console.log(chatroomId, 'onEnterChat');
    navigate(`${PATH.chatRoom}/${chatroomId}`);
  };

  const renderSkeletons = (length: number) => {
    return Array.from({ length }).map((_, index) => (
      <SkeletonChatItem key={index} />
    ));
  };

  // TODO 최근 보내진 채팅순으로(알림이 왔을때) 재정렬

  return (
    <>
      <TopBar>
        <Title>채팅</Title>
      </TopBar>
      <div css={(theme) => pageStyle(theme)}>
        <ul>
          {status === 'loading' && renderSkeletons(5)}
          {chatRooms?.length === 0 && (
            <div className="data-status-info">채팅방이 없습니다</div>
          )}
          {chatRooms?.map((chatItem: ChatRoomType) => (
            <ChatItem
              key={chatItem.chatroomId}
              opponent={chatItem.opponent}
              lastChatContent={chatItem.lastChatContent}
              lastChatTime={chatItem.lastChatTime}
              unreadChatCount={chatItem.unreadChatCount}
              thumbnailUrl={chatItem.product.thumbnail}
              onEnterChat={() => onEnterChat(chatItem.chatroomId)}
            />
          ))}
        </ul>
      </div>
    </>
  );
};

const pageStyle = (theme: Theme) => {
  return css`
    flex: 1;
    padding-top: 56px;
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

    .data-status-info {
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: default;
      width: 100%;
      height: 70px;
      font: ${theme.font.displayDefault16};
    }
  `;
};
