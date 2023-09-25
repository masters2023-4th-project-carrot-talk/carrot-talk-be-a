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
import { Theme, css } from '@emotion/react';
import { useAuth } from '@hooks/useAuth';
import { useInput } from '@hooks/useInput';
import { useChatRoomHistories, useChatRoomInfo } from '@queries/chat';
import { Client } from '@stomp/stompjs';
import { numberToCommaString } from '@utils/formatPrice';
import { getAccessToken } from '@utils/localStorage';
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

type RealtimeChattingType = {
  chatroomId: number;
  content: string;
  read: boolean;
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
  const {
    value: message,
    onChangeValue: onChangeMessage,
    isValidValue: isValidMessage,
  } = useInput({
    initialValue: '',
    validator: (value) => value.trim().length > 0,
    warningMessage: '',
  });
  const client = useRef<Client>();

  const serverUrl = 'ws://13.125.16.208:8080';

  useEffect(() => {
    console.log('chatroomInfo', chatroomInfo.data);
  }, [chatroomInfo.data]);

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

        console.log('연결 성공');

        client.current.subscribe(`/subscribe/${chatRoomId}`, (message) => {
          const body = JSON.parse(message.body);

          if ('anyoneEnterRoom' in body) {
            return;
          }

          console.log("body", body);
          setRealtimeChattings((prev) => [...prev, body]);
        });
      },
      onDisconnect: () => {
        console.log('연결 끊김');
      },
    });

    client.current.activate();

    return () => {
      client.current?.deactivate();
    };
  }, []);

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
    <div css={(theme) => pageStyle(theme)}>
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
              <Button
                variant="text"
                className="button__topbar"
                onClick={() => {
                  console.log('topbar dropdown');
                }}
              >
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
                    console.log(' 채팅방 나가기');
                  }}
                >
                  채팅방 나가기
                </MenuItem>
              </MenuBox>
            }
          />
        </RightButton>
      </TopBar>
      <div
        className="info-banner"
        onClick={() => {
          console.log('상세페이지로 이동');
        }}
      >
        <ImageBox size="s" imageUrl={chatroomInfo.data?.product.thumbnail} />
        <div className="info-banner-body">
          <p className="info-banner-body__title">
            {chatroomInfo.data?.product.title}
          </p>
          <p className="info-banner-body__price">
            {numberToCommaString(chatroomInfo.data?.product.price ?? 0)}원
          </p>
        </div>
      </div>
      <div className="chat-body">
        {chattingHistories.data?.map((history) => (
          <Bubble
            key={history.chattingId}
            isMine={history.senderId === userInfo.id}
            isRead={history.isRead}
            message={history.content}
          />
        ))}
        {realtimeChattings.map((chatting, index) => (
          <Bubble
            key={index}
            isMine={chatting.senderId === userInfo.id}
            isRead={chatting.read}
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
      display: none;
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
      box-sizing: border-box;
      cursor: pointer;
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
        display: flex;
        width: 305px;
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
      margin-top: 57px;
      margin-bottom: 64px;
    }
  `;
};
