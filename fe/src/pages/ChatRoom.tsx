import { Bubble } from '@components/chat/Bubble';
import { ChatBar } from '@components/common/actionBar/ChatBar';
import { Button } from '@components/common/button/Button';
import { Dropdown } from '@components/common/dropdown/Dropdown';
import { ChevronLeft, Dots, Send } from '@components/common/icons';
import { ImageBox } from '@components/common/imageBox/ImageBox';
import { Input } from '@components/common/input/Input';
import { MenuBox } from '@components/common/menu/MenuBox';
import { MenuItem } from '@components/common/menu/MenuItem';
import { LeftButton } from '@components/common/topBar/LeftButton';
import { RightButton } from '@components/common/topBar/RightButton';
import { Title } from '@components/common/topBar/Title';
import { TopBar } from '@components/common/topBar/TopBar';
import { PATH } from '@constants/path';
import { Theme, css } from '@emotion/react';
import { useAuth } from '@hooks/useAuth';
import { useInput } from '@hooks/useInput';
import { useIntersectionObserver } from '@hooks/useObserver';
import { useChatRoomHistories, useChatRoomInfo } from '@queries/chat';
import { Client } from '@stomp/stompjs';
import { numberToCommaString } from '@utils/formatPrice';
import { getAccessToken } from '@utils/localStorage';
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

type RealtimeChattingType = {
  chatroomId: number;
  content: string;
  isRead: boolean;
  senderId: number;
};

export const ChatRoom: React.FC = () => {
  const { id: chatRoomId } = useParams();
  const { userInfo } = useAuth();
  const navigate = useNavigate();
  const chatroomInfo = useChatRoomInfo(Number(chatRoomId));
  const chattingHistories = useChatRoomHistories(Number(chatRoomId));
  const [realtimeChattings, setRealtimeChattings] = useState<
    RealtimeChattingType[]
  >([]);
  const [prevScrollHeight, setPrevScrollHeight] = useState<number | null>(null);
  const [isOpponentEnter, setIsOpponentEnter] = useState<boolean>(false);
  const {
    value: message,
    onChangeValue: onChangeMessage,
    isValidValue: isValidMessage,
  } = useInput({
    initialValue: '',
    validator: (value) => value.trim().length > 0,
    warningMessage: '',
  });
  const { observeTarget } = useIntersectionObserver({
    inviewCallback: () => {
      if (chattingHistories.hasNextPage) {
        setPrevScrollHeight(chatroomElement.current?.scrollHeight ?? null);
        chattingHistories.fetchNextPage();
      }
    },
  });
  const client = useRef<Client>();
  const chatroomElement = useRef<HTMLDivElement>(null);

  const serverUrl = import.meta.env.VITE_BASE_URL.replace('http', 'ws');

  useEffect(() => {
    client.current = new Client({
      brokerURL: `${serverUrl}/chat`,
      connectHeaders: {
        Authorization: getAccessToken()!,
        ChatroomId: chatRoomId!,
      },
      disconnectHeaders: {
        Authorization: getAccessToken()!,
        ChatroomId: chatRoomId!,
      },
      onConnect: () => {
        if (!client.current) {
          return;
        }

        client.current.subscribe(`/subscribe/${chatRoomId}`, (message) => {
          const body = JSON.parse(message.body);

          if ('enterMemberId' in body) {
            setIsOpponentEnter(true);
            setRealtimeChattings((rc) =>
              rc.map((chatting) => {
                chatting.isRead = true;
                return chatting;
              }),
            );
            return;
          }

          setRealtimeChattings((prev) => [...prev, body]);
        });
      },
      onDisconnect: () => {},
    });

    client.current.activate();

    return () => {
      client.current?.deactivate();
    };
  }, []);

  useEffect(() => {
    if (!chatroomElement.current) {
      return;
    }

    if (prevScrollHeight) {
      chatroomElement.current.scrollTo({
        top: chatroomElement.current.scrollHeight! - prevScrollHeight,
        behavior: 'auto',
      });
      setPrevScrollHeight(null);
      return;
    }

    chatroomElement.current.scrollTo({
      top: chatroomElement.current.scrollHeight,
      behavior: 'auto',
    });
  }, [chattingHistories.data, realtimeChattings]);

  const resetMessageInput = () => {
    onChangeMessage('');
  };

  const sendMessage = () => {
    if (!client.current || !isValidMessage) {
      return;
    }

    client.current.publish({
      destination: `/publish/message`,
      body: JSON.stringify({
        chatroomId: Number(chatRoomId),
        content: message,
        senderId: userInfo.id,
        isRead: false,
      }),
    });
    resetMessageInput();
  };

  return (
    <div css={(theme) => pageStyle(theme)} ref={chatroomElement}>
      <TopBar>
        <LeftButton>
          <Button variant="text" onClick={() => navigate(-1)}>
            <ChevronLeft className="button__back" />
            닫기
          </Button>
        </LeftButton>
        <Title>{chatroomInfo.data?.opponent.nickname}</Title>
        <RightButton>
          <Dropdown
            opener={
              <Button variant="text" className="button__topbar">
                <Dots />
              </Button>
            }
            menu={
              <MenuBox>
                <MenuItem
                  onClick={() => {
                    console.log('알람 끄기');
                  }}
                >
                  알람 끄기
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    console.log('신고하기');
                  }}
                >
                  신고하기
                </MenuItem>
                <MenuItem
                  variant="warning"
                  onClick={() => {
                    console.log('채팅방 나가기(미구현)');
                    navigate(-1);
                  }}
                >
                  채팅방 나가기
                </MenuItem>
              </MenuBox>
            }
          />
        </RightButton>
      </TopBar>
      <div className="info-banner">
        <ImageBox size="s" imageUrl={chatroomInfo.data?.product.thumbnail} />
        <div className="info-banner-body">
          <p className="info-banner-body__title">
            {chatroomInfo.data?.product.title}
          </p>
          <p className="info-banner-body__price">
            {numberToCommaString(chatroomInfo.data?.product.price ?? 0)}원
          </p>
        </div>
        <Button
          variant="rectangle"
          size="s"
          state="active"
          onClick={() => {
            navigate(`${PATH.detail}/${chatroomInfo.data?.product.id}`);
          }}
        >
          상품 보기
        </Button>
      </div>
      <div ref={observeTarget} css={obseverStyle}></div>
      <div className="chat-body">
        {chattingHistories.data?.map((history) => (
          <Bubble
            key={history.chattingId}
            isMine={history.senderId === userInfo.id}
            isRead={isOpponentEnter || history.isRead}
            message={history.content}
          />
        ))}
        {realtimeChattings.map((chatting, index) => (
          <Bubble
            key={index}
            isMine={chatting.senderId === userInfo.id}
            isRead={chatting.isRead}
            message={chatting.content}
          />
        ))}
      </div>
      <ChatBar>
        <Input
          value={message}
          onChange={onChangeMessage}
          onPressEnter={sendMessage}
          placeholder="내용을 입력하세요"
          radius="l"
          variant="outlined"
        />
        <Button
          variant="fab"
          size="s"
          onClick={sendMessage}
          disabled={!isValidMessage}
        >
          <Send />
        </Button>
      </ChatBar>
    </div>
  );
};

const pageStyle = (theme: Theme) => {
  return css`
    ::-webkit-scrollbar {
      width: 10px;
      background-color: ${theme.color.neutral.background};

      &-button {
        width: 0;
        height: 0;
      }

      &-thumb {
        width: 4px;
        border-radius: 10px;
        background-color: ${theme.color.neutral.border};
        border: 3px solid ${theme.color.neutral.background};
      }

      &-track {
        background-color: transparent;
      }
    }

    height: 100vh;
    overflow-y: auto;

    .button__back {
      stroke: ${theme.color.neutral.textStrong};
    }

    .button__topbar {
      stroke: ${theme.color.neutral.textStrong};
    }

    .info-banner {
      width: 100%;
      box-sizing: border-box;
      height: 80px;
      position: fixed;
      top: 56px;
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 16px;
      border-bottom: 0.8px solid ${theme.color.neutral.border};
      background-color: ${theme.color.neutral.background};

      &-body {
        flex: 1 0 0;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        flex-shrink: 0;
        align-self: stretch;

        > p {
          display: flex;
          flex-direction: column;
          justify-content: center;
          flex: 1 0 0;
          align-self: stretch;
          color: ${theme.color.neutral.textStrong};
        }
        &__title {
          font: ${theme.font.displayDefault16};
        }
        &__price {
          font: ${theme.font.displayStrong16};
        }
      }
    }

    .chat-body {
      display: flex;
      flex-direction: column;
      align-items: stretch;
      gap: 8px;
      padding: 92px 16px 12px;
      margin-bottom: 64px;
    }
  `;
};

const obseverStyle = css`
  width: 100%;
  height: 57px;
`;
