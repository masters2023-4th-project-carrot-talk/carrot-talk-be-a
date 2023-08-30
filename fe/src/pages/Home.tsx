import { Theme, css } from '@emotion/react';
import { useState } from 'react';
import { Button } from '@/components/common/button/Button';
import { Dropdown } from '@/components/common/dropdown/Dropdown';
import { ListItem } from '@/components/common/list/ListItem';
import { MenuBox } from '@/components/common/menu/MenuBox';
import { MenuItem } from '@/components/common/menu/MenuItem';
import { LeftButton } from '@/components/common/topBar/LeftButton';
import { RightButton } from '@/components/common/topBar/RightButton';
import { TopBar } from '@/components/common/topBar/TopBar';

import { ReactComponent as ChevronDown } from '@/assets/chevron-down.svg';
import { ReactComponent as LayoutGrid } from '@/assets/layout-grid.svg';
import { ReactComponent as Plus } from '@/assets/plus.svg';
import { ListBox } from '@/components/common/list/ListBox';
import { usePopupStore } from '@/store/PopupStore';
import { LocationModal } from '@/components/common/modal/locationModal/LocationModal';
import { AlertButtons } from '@/components/common/alert/AlertButtons';
import { AlertContent } from '@/components/common/alert/AlertContent';
import { Alert } from '@/components/common/alert/Alert';

const mock = {
  products: [
    {
      id: 1,
      name: '빈티지 밀크 그래스 램프',
      imageUrl: 'https://cdn.imweb.me/thumbnail/20230616/e53bba24afb76.jpg',
      location: '역삼1동', // 이름만
      createdAt: '2023-08-10T14:59', //localDateTIme(UTC)
      price: 15800, // Long   // 없으면 null
      status: '예약중', // 판매중, 판매완료
      chatCount: 0, // long    // 없으면 0
      likeCount: 1, // long     // 없으면 0
    },
    {
      id: 2,
      name: '빈티지 밀크 그래스 램프',
      imageUrl: 'https://cdn.imweb.me/thumbnail/20230616/e53bba24afb76.jpg',
      location: '역삼1동', // 이름만
      createdAt: '2023-08-10T14:59', //localDateTIme(UTC)
      price: 15800, // Long   // 없으면 null
      status: '예약중', // 판매중, 판매완료
      chatCount: 0, // long    // 없으면 0
      likeCount: 1, // long     // 없으면 0
    },
    {
      id: 3,
      name: '빈티지 밀크 그래스 램프',
      imageUrl: 'https://cdn.imweb.me/thumbnail/20230616/e53bba24afb76.jpg',
      location: '역삼1동', // 이름만
      createdAt: '2023-08-10T14:59', //localDateTIme(UTC)
      price: 15800, // Long   // 없으면 null
      status: '예약중', // 판매중, 판매완료
      chatCount: 0, // long    // 없으면 0
      likeCount: 1, // long     // 없으면 0
    },
    {
      id: 4,
      name: '빈티지 밀크 그래스 램프',
      imageUrl: 'https://cdn.imweb.me/thumbnail/20230616/e53bba24afb76.jpg',
      location: '역삼1동', // 이름만
      createdAt: '2023-08-10T14:59', //localDateTIme(UTC)
      price: 15800, // Long   // 없으면 null
      status: '예약중', // 판매중, 판매완료
      chatCount: 0, // long    // 없으면 0
      likeCount: 1, // long     // 없으면 0
    },
    {
      id: 5,
      name: '빈티지 밀크 그래스 램프',
      imageUrl: 'https://cdn.imweb.me/thumbnail/20230616/e53bba24afb76.jpg',
      location: '역삼1동', // 이름만
      createdAt: '2023-08-10T14:59', //localDateTIme(UTC)
      price: 15800, // Long   // 없으면 null
      status: '예약중', // 판매중, 판매완료
      chatCount: 0, // long    // 없으면 0
      likeCount: 1, // long     // 없으면 0
    },

    {
      id: 6,
      name: '도자기 화병 5종',
      imageUrl:
        'https://img.29cm.co.kr/next-product/2023/08/02/f138eefeb2da4b3f9e545547f6793c15_20230802142041.jpg?width=300',
      location: '역삼1동', // 이름만
      createdAt: '2023-08-29T15:01', //localDateTime(UTC)
      price: 2450000, // Long
      status: null, // 판매중, 판매완료
      chatCount: 0, // long
      likeCount: 0, // long
    },
    {
      id: 7,
      name: '도자기 화병 5종',
      imageUrl:
        'https://img.29cm.co.kr/next-product/2023/08/02/f138eefeb2da4b3f9e545547f6793c15_20230802142041.jpg?width=300',
      location: '역삼1동', // 이름만
      createdAt: '2023-06-22T14:59', //localDateTime(UTC)
      price: 1400800000, // Long
      status: '예약중', // 판매중, 판매완료
      chatCount: 2, // long
      likeCount: 0, // long
    },
  ],
  nextId: 14, // null이면 다음 목록이 없음
};

export const Home: React.FC = () => {
  const { isOpen, currentDim, togglePopup, setCurrentDim } = usePopupStore();
  const [selected, setSelected] = useState('역삼1동');

  const onOpenModal = () => {
    //TODO : 내 동네 설정 모달 보여주기
    togglePopup('modal', true);
    setCurrentDim('modal');
  };

  const onOpenDetail = (id: number) => {
    //TODO : 상세페이지 보여주기
    console.log(id);
  };

  const onSelectMainLocation = () => {
    //대표 동네 설정 api
  };

  return (
    <div css={pageStyle}>
      <TopBar>
        <LeftButton>
          <Dropdown autoClose>
            <Button variant="text" className="button__topbar">
              역삼1동
              <ChevronDown />
            </Button>
            <MenuBox>
              {locations.map((location) => (
                <MenuItem
                  key={location.id}
                  state={selected.id === location.id ? 'selected' : 'default'}
                  onClick={onSelectMainLocation}
                >
                  {location.name}
                </MenuItem>
              ))}
              <MenuItem onClick={onOpenModal}>내 동네 설정하기</MenuItem>
            </MenuBox>
          </Dropdown>
        </LeftButton>
        <RightButton>
          <Button variant="text" className="button__topbar">
            <LayoutGrid />
          </Button>
        </RightButton>
      </TopBar>
      <Button variant="fab" size="l" className="button__add">
        <Plus />
      </Button>
      <ListBox>
        {mock.products.map((product) => (
          <ListItem
            product={product}
            onOpenDetail={() => onOpenDetail(product.id)}
          />
        ))}
      </ListBox>
      <LocationModal />
      <Alert isOpen={isOpen.alert} currentDim={currentDim}>
        <AlertContent>'역삼1동'을 삭제하시겠어요?</AlertContent>
        <AlertButtons buttonText="취소" onDelete={() => {}} />
      </Alert>
    </div>
  );
};

const pageStyle = (theme: Theme) => {
  return css`
    flex: 1;

    .button__topbar {
      stroke: ${theme.color.neutral.textStrong};
    }

    .button__add {
      position: absolute;
      bottom: 88px;
      right: 24px;
      stroke: ${theme.color.accent.text};
    }
  `;
};
