import { useState } from 'react';
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

import { useMyLocations } from '@/hooks/location';
import { usePopupStore } from '@/store/popupStore';
import { Category } from '@/components/home/Category';
import { useCategories } from '@/hooks/category';
import { useLayoutStore } from '@/store/layoutStore';
import { useProducts } from '@/hooks/products';
import { SkeletonListItem } from '@/components/common/skeleton/listItem';
import { useIntersectionObserver } from '@/hooks/observer';

export const Home: React.FC = () => {
  const { locations, status: locationStatus } = useMyLocations();
  const { categories } = useCategories();
  // useQuery들 묶을수있는지
  const { togglePopup, setCurrentDim } = usePopupStore();
  const [selectedLocationId, setSelectedLocationId] = useState<number | null>(
    1,
  );
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null,
  );

  const { setShouldSlideLeft } = useLayoutStore();

  const { products, fetchNextPage, hasNextPage, status, isFetchingNextPage } =
    useProducts(selectedLocationId, selectedCategoryId);

  const { observeTarget } = useIntersectionObserver(fetchNextPage, hasNextPage);

  const onOpenModal = () => {
    togglePopup('modal', true);
    setCurrentDim('modal');
  };

  const onOpenDetail = (id: number) => {
    //TODO : 상세페이지 보여주기
    console.log(id);
  };

  const onOpenCategory = () => {
    setShouldSlideLeft();
  };

  const onCloseCategory = () => {
    setShouldSlideLeft();
  };

  const onFilterProducts = (id: number) => {
    //TODO 필터링만 수행
    setSelectedLocationId(id);
  };

  const onSelectCategory = (id: number) => {
    //TODO 카테고리 선택
    setSelectedCategoryId(id);
  };

  const renderSkeletons = () => {
    return Array.from({ length: 10 }).map((_, index) => (
      <SkeletonListItem key={index} />
    ));
  };

  const shouldShowSkeletons = status === 'loading' || isFetchingNextPage;
  const shouedShowEndOfData = !hasNextPage && status !== 'loading';

  return (
    <>
      <div css={pageStyle}>
        <>
          <TopBar>
            <RightButton>
              <Button
                variant="text"
                className="button__topbar"
                onClick={onOpenCategory}
              >
                <LayoutGrid />
              </Button>
            </RightButton>
            <LeftButton>
              <Dropdown autoClose>
                <Button variant="text" className="button__topbar">
                  역삼1동
                  <ChevronDown />
                </Button>
                <MenuBox>
                  {locationStatus === 'loading' && (
                    <MenuItem>로딩스피너</MenuItem>
                  )}
                  {locationStatus === 'error' && (
                    <MenuItem>동네 정보를 가져오지 못했습니다</MenuItem>
                  )}
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
                  {/* TODO 동네정보가 없을때 막을 필요가 있음 */}
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
            {shouldShowSkeletons && <>{renderSkeletons()}</>}
          </ListBox>
          {shouedShowEndOfData && (
            <div className="end-of-data">전부 살펴 봤어요!</div>
          )}
          <LocationModal />
          <div ref={observeTarget} css={obseverStyle}></div>
        </>
      </div>

      <Category
        categories={categories}
        onCloseCategory={onCloseCategory}
        onSelectCategory={onSelectCategory}
      />
    </>
  );
};

const pageStyle = (theme: Theme) => {
  return css`
    overflow-y: auto;
    scroll-behavior: smooth;
    ::-webkit-scrollbar {
      display: none;
    }
    height: 100vh;

    .button__topbar {
      stroke: ${theme.color.neutral.textStrong};
    }

    .button__add {
      position: absolute;
      bottom: 88px;
      right: 24px;
      z-index: 1;
      stroke: ${theme.color.accent.text};
    }

    .end-of-data {
      cursor: default;
      text-align: center;
      width: 100%;
      padding: 30px 0px 100px 0px;
      font: ${theme.font.displayDefault16};
    }
  `;
};

const obseverStyle = css`
  height: 1px;
  width: 100%;
  background-color: lightblue;
`;
