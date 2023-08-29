import { ListItem } from '@/components/common/list/ListItem';
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
    <div css={pageStyle}>
      Home
      <ul>
        {mock.products.map((product) => (
          /*  key={product.id} id가 타입에 없음.. 실종.. */
          <ListItem product={product} />
        ))}
      </ul>
    </div>
  );
};

const pageStyle = (theme: Theme) => {
  return css`
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
