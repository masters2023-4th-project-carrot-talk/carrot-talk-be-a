import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/common/button/Button';
import { Dropdown } from '@/components/common/dropdown/Dropdown';
import { ListItem } from '@/components/common/list/ListItem';
import { MenuBox } from '@/components/common/menu/MenuBox';
import { MenuItem } from '@/components/common/menu/MenuItem';
import { LeftButton } from '@/components/common/topBar/LeftButton';
import { RightButton } from '@/components/common/topBar/RightButton';
import { TopBar } from '@/components/common/topBar/TopBar';
import { ChevronDown, LayoutGrid } from '@components/common/icons';
import { Theme, css } from '@emotion/react';

import { ReactComponent as Plus } from '@/assets/plus.svg';
import { ListBox } from '@/components/common/list/ListBox';
import { LocationModal } from '@/components/common/modal/locationModal/LocationModal';

import { ErrorPage } from './ErrorPage';
import { LoadingPage } from './LoadingPage';
import { useMyLocations } from '@/hooks/location';
import { usePopupStore } from '@/store/popupStore';
import { Category } from '@/components/home/Category';
import { useCategories } from '@/hooks/category';
import { useProducts } from '@/hooks/products';

// TODO 페이지가 로드됐을때, 내동네 api 호출
// TODO 모달에서 동네를 추가하거나 삭제하면, 영향을 받아 locations가 수정돼야함
export const Home: React.FC = () => {
  const { locations } = useMyLocations();
  const { categories } = useCategories();
  const { togglePopup, setCurrentDim } = usePopupStore();
  const [selectedLocationId, setSelectedLocationId] = useState<number | null>(
    1,
  );
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null,
  );
  const [showCategory, setShowCategory] = useState(false);

  // const { products, isFetchingNextPage, hasNextPage, fetchNextPage } =
  //   useProducts(selectedLocationId, 3);
  const { products, fetchNextPage, hasNextPage, status, isFetchingNextPage } =
    useProducts(1); // TODO locationId도 null가능이지만 무조건 역삼1동이 됨 locations로 받아온 것중  categoryId는 null 가능, 있을때 넣어줘야함

  const observeTarget = useRef<HTMLDivElement | null>(null);

  // - 상품 목록을 조회한다.
  //  - `locationId` 넘기지 않으면 기본 동네(역삼1동)의 상품 목록을 반환한다.
  //  - `categoryId`는 null 가능하다.(안 보내도 됨)
  //  - 가격이 없는 경우 응답 데이터의 price는 null이 온다.
  //  - 상품을 10개씩 반환한다.
  //      - 페이지네이션(슬라이싱) 적용 필요
  //      - 상품 목록을 조회하는 다른 API에도
  //  - 다음 페이지(인덱스): `next`
  //      - 없으면 첫 페이지 목록을 반환한다.
  //  - 개수: `size`
  // - 없으면 기본 개수(**10개**)를 반환한다.

  // TODO 필터링과 대표동네 설정은 별개로 처리함에 따라, 초기에는 모든 동네의 물품을 보여줌(초안)
  // TODO useQueries이용해서 로딩, 에러처리 한꺼번에?

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && hasNextPage) {
        // 교차중 && 다음페이지가 있으면
        fetchNextPage(); // 다음페이지를 가져옴
      }
    });
  });

  useEffect(() => {
    if (observeTarget.current) {
      observer.observe(observeTarget.current);
    }
    return () => {
      observer.disconnect();
    };
  }, [observeTarget]);

  // if (status === 'loading') {
  //   // TODO 상품목록 loading이 메인이 돼야함
  //   // TODO 메인페이지에 들어와있을때 locations의 loading은 무의미함
  //   return <LoadingPage />;
  // }

  // if (status === 'error') {
  //   // TODO 오류 처리도 생각하기
  //   // TODO 페이지 내부의 오류를 전부 통합하여 처리하는지? 아니면 각각의 컴포넌트에서 처리하는지?
  //   return;
  // }

  const onOpenModal = () => {
    togglePopup('modal', true);
    setCurrentDim('modal');
  };

  const onOpenDetail = (id: number) => {
    //TODO : 상세페이지 보여주기
    console.log(id);
  };

  const onOpenCategory = () => {
    //TODO : 카테고리 페이지 보여주기
    setShowCategory(true);
  };

  const onCloseCategory = () => {
    //TODO : 카테고리 페이지 닫기
    setShowCategory(false);
  };

  const onFilterProducts = (id: number) => {
    //TODO 필터링만 수행
    setSelectedLocationId(id);
  };

  return (
    <>
      <div css={pageStyle}>
        {!showCategory && (
          <>
            <TopBar>
              <LeftButton>
                <Dropdown autoClose>
                  <Button variant="text" className="button__topbar">
                    역삼1동
                    <ChevronDown />
                  </Button>
                  <MenuBox>
                    {locations &&
                      locations.map((location) => (
                        <MenuItem
                          key={location.id}
                          state={
                            selectedLocationId === location.id
                              ? 'selected'
                              : 'default'
                          }
                          onClick={() => onFilterProducts(location.id)}
                        >
                          {location.name}
                        </MenuItem>
                      ))}
                    <MenuItem onClick={onOpenModal}>내 동네 설정하기</MenuItem>
                  </MenuBox>
                </Dropdown>
              </LeftButton>
              <RightButton>
                <Button
                  variant="text"
                  className="button__topbar"
                  onClick={onOpenCategory}
                >
                  <LayoutGrid />
                </Button>
              </RightButton>
            </TopBar>
            <Button variant="fab" size="l" className="button__add">
              <Plus />
            </Button>
            <ListBox>
              {products?.map((product) => (
                <ListItem
                  key={product.id}
                  product={product}
                  onOpenDetail={() => onOpenDetail(product.id)}
                />
              ))}
            </ListBox>
            <LocationModal />
            <div ref={observeTarget} css={obseverStyle}></div>
            {/* 관찰대상, entries 배열에는 이 엘리먼트에 대한 교차 정보가 포함됨  */}
          </>
        )}
      </div>

      <Category
        categories={categories}
        showCategory={showCategory}
        onCloseCategory={onCloseCategory}
      />
    </>
  );
};

const pageStyle = (theme: Theme) => {
  return css`
    flex: 1;
    border: 1px solid red;
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
// flex: 1;

const obseverStyle = css`
  height: 1px;
  border: 200px solid green;
`;
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
