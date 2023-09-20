import {
  ChatItem,
  ChatItemProps,
  SkeletonChatItem,
} from '@components/common/chat/ChatItem';
import { Title } from '@components/common/topBar/Title';
import { TopBar } from '@components/common/topBar/TopBar';
import { Theme, css } from '@emotion/react';
import { useChatRooms } from '@queries/chat';
import { useEffect, useState } from 'react';

type ChatRoomType = {
  id: number;
} & ChatItemProps;

export const Chat: React.FC = () => {
  const [chatItems, setChatItems] = useState<ChatRoomType[]>([]);
  const { chatRooms, status, error } = useChatRooms(); // TODO 추후 채팅 event로 인하여 커스텀 훅으로 이동할 가능성

  useEffect(() => {
    setTimeout(
      () =>
        setChatItems([
          {
            id: 1,
            chatPartner: {
              id: 1,
              nickname: 'John',
              imageUrl: 'https://picsum.photos/200',
            },
            lastMessage: 'Hello there!',
            updatedAt: new Date('2023-09-19T10:30:00'),
            unreadMessages: 2,
            thumbnailUrl: 'https://picsum.photos/200',
          },
          {
            id: 2,
            chatPartner: {
              id: 2,
              nickname: 'Alice',
              imageUrl: 'https://picsum.photos/200',
            },
            lastMessage: 'How are you?',
            updatedAt: new Date('2023-09-18T15:45:00'),
            unreadMessages: 0,
            thumbnailUrl: 'https://picsum.photos/200',
          },
          {
            id: 3,
            chatPartner: {
              id: 3,
              nickname: 'Bob',
              imageUrl: 'https://picsum.photos/200',
            },
            lastMessage:
              '안녕하세요! 한 가지 궁금한 점이 있어서 연락드립니다. 다름이 아니라',
            updatedAt: new Date('2023-09-17T20:15:00'),
            unreadMessages: 1,
            thumbnailUrl: 'https://picsum.photos/200',
          },
        ]),
      3000,
    );
  }, []);

  const renderSkeletons = (length: number) => {
    return Array.from({ length }).map((_, index) => (
      <SkeletonChatItem key={index} />
    ));
  };

  return (
    <>
      <TopBar>
        <Title>채팅</Title>
      </TopBar>
      <div css={(theme) => pageStyle(theme)}>
        <ul>
          {chatItems.length === 0 && renderSkeletons(5)}
          {chatItems.map((chatItem) => (
            <ChatItem
              key={chatItem.id}
              chatPartner={chatItem.chatPartner}
              lastMessage={chatItem.lastMessage}
              updatedAt={chatItem.updatedAt}
              unreadMessages={chatItem.unreadMessages}
              thumbnailUrl={chatItem.thumbnailUrl}
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
  `;
};
