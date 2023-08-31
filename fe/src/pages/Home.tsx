import { ReactComponent as ChevronDown } from '@/assets/chevron-down.svg';
import { ReactComponent as LayoutGrid } from '@/assets/layout-grid.svg';
import { Button } from '@/components/common/button/Button';
import { Dropdown } from '@/components/common/dropdown/Dropdown';
import { ListItem } from '@/components/common/list/ListItem';
import { MenuBox } from '@/components/common/menu/MenuBox';
import { MenuItem } from '@/components/common/menu/MenuItem';
import { LeftButton } from '@/components/common/topBar/LeftButton';
import { RightButton } from '@/components/common/topBar/RightButton';
import { TopBar } from '@/components/common/topBar/TopBar';
import { Theme, css } from '@emotion/react';

const mock = {
  products: [
    {
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
      name: '도자기 화병 5종',
      imageUrl:
        'https://img.29cm.co.kr/next-product/2023/08/02/f138eefeb2da4b3f9e545547f6793c15_20230802142041.jpg?width=300',
      location: '역삼1동', // 이름만
      createdAt: '2023-08-28T14:59', //localDateTime(UTC)
      price: 14500000, // Long
      status: '예약중', // 판매중, 판매완료
      chatCount: 2, // long
      likeCount: 2, // long
    },
    {
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
  return (
    <>
      <TopBar>
        <LeftButton>
          <Dropdown autoClose>
            <Button variant="text">
              역삼1동
              <ChevronDown stroke="#000" />
            </Button>
            <MenuBox>
              <MenuItem state="selected">역삼1동</MenuItem>
              <MenuItem>내 동네 설정하기</MenuItem>
            </MenuBox>
          </Dropdown>
        </LeftButton>
        <RightButton>
          <Button variant="text">
            <LayoutGrid stroke="#000" />
          </Button>
        </RightButton>
      </TopBar>
      <div css={(theme) => pageStyle(theme)}>
        <ul>
          {mock.products.map((product) => (
            /*  key={product.id} id가 타입에 없음.. 실종.. */
            <ListItem product={product} />
          ))}
        </ul>
      </div>
    </>
  );
};

const pageStyle = (theme: Theme) => {
  return css`
    flex: 1;

    ul {
      display: flex;
      box-sizing: border-box;
      width: 393px;
      padding: 0px 16px;
      flex-direction: column;
      align-items: flex-start;
    }
  `;
};
