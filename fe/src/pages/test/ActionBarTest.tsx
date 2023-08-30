import React, { useState, useEffect } from 'react';
import { Theme, css } from '@emotion/react';

import { EditBar } from '@/components/common/actionBar/EditBar';
import { Button } from '@/components/common/button/Button';
import { PostBar } from '@/components/common/actionBar/PostBar';
import { ChatBar } from '@/components/common/actionBar/ChatBar';
import { Input } from '@/components/common/input/Input';

import { ReactComponent as Heart } from '@assets/heart.svg';
import { ReactComponent as Send } from '@assets/send.svg';
import { formatPrice } from '@/utils/formatPrice';

const mock = [
  {
    id: 3,
    name: '역삼 1동', // 로그인안한 유저는 역삼 1동이 default, 첫 번째가 대표 동네
  },

  {
    id: 4,
    name: '역삼 2동', // 로그인안한 유저는 역삼 1동이 default,
  },
];

export const ActionBarTest: React.FC = () => {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const onSelectLocation = (id: number) => {
    setSelectedId(id);
  };

  useEffect(() => {
    if (mock.length > 0) {
      setSelectedId(mock[0].id);
    }
  }, []);

  const isLiked = true; // TODO : user가 좋아요를 눌렀는지 안눌렀는지
  const formattedPrice = formatPrice(158000); // TODO : price 데이터 필요

  return (
    <div css={pageStyle}>
      <EditBar>
        {mock.map((location) => (
          <Button
            key={location.id}
            variant="category"
            state={selectedId === location.id ? 'active' : 'default'}
            onClick={() => onSelectLocation(location.id)}
          >
            {location.name}
          </Button>
        ))}
      </EditBar>

      <PostBar isLiked={isLiked}>
        <div className="info">
          <Heart onClick={() => {}} />
          {formattedPrice}
        </div>
        <Button variant="rectangle" size="s" state="active" onClick={() => {}}>
          대화 중인 채팅방{/* count가 추가될 수 있습니다 */}
        </Button>
      </PostBar>

      <ChatBar>
        <Input
          onChange={() => {}}
          onPressEnter={() => {}}
          placeholder="내용을 입력하세요"
          radius="l"
          variant="outlined"
        />

        <Button variant="fab" size="s">
          <Send />
        </Button>
      </ChatBar>
    </div>
  );
};

const pageStyle = (theme: Theme) => {
  return css`
    min-height: 100%;

    .info {
      display: flex;
      gap: 8px;
      align-items: center;
    }
  `;
};
