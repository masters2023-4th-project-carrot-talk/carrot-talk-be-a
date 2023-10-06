import { ReactComponent as Plus } from '@assets/plus.svg';
import { Alert } from '@components/common/alert/Alert';
import { AlertButtons } from '@components/common/alert/AlertButtons';
import { AlertContent } from '@components/common/alert/AlertContent';
import { Button } from '@components/common/button/Button';
import { Dropdown } from '@components/common/dropdown/Dropdown';
import { ChevronDown, LayoutGrid } from '@components/common/icons';
import { ListBox } from '@components/common/list/ListBox';
import { ListItem } from '@components/common/list/ListItem';
import { MenuBox } from '@components/common/menu/MenuBox';
import { MenuItem } from '@components/common/menu/MenuItem';
import { LocationModal } from '@components/common/modal/locationModal/LocationModal';
import { SkeletonListItem } from '@components/common/skeleton/listItem';
import { LeftButton } from '@components/common/topBar/LeftButton';
import { RightButton } from '@components/common/topBar/RightButton';
import { TopBar } from '@components/common/topBar/TopBar';
import { Category } from '@components/home/Category';
import { PATH } from '@constants/path';
import { Theme, css } from '@emotion/react';
import { useAuth } from '@hooks/useAuth';
import { useIntersectionObserver } from '@hooks/useObserver';
import { useAlert, useModal } from '@hooks/usePopups';
import { useCategories } from '@queries/category';
import { useMyLocations } from '@queries/location';
import { useDeleteProduct, useProducts } from '@queries/products';
import { useLayoutStore } from '@stores/layoutStore';
import { modifiedLocationName } from '@utils/modifyLocationName';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Home: React.FC = () => {
  const navigate = useNavigate();

  const { isLogin } = useAuth();
  const { setShouldSlideLeft } = useLayoutStore();
  const { onOpenModal } = useModal();
  const { alertSource, currentDim, onOpenAlert, onCloseAlert } = useAlert();
  const { serverLocations } = useMyLocations(isLogin);
  const { categories } = useCategories();
  const deleteProductMutation = useDeleteProduct('home');
  const [selectedCategoryId, setSelectedCategoryId] = useState<
    number | undefined | null
  >(null);

  const [selectProduct, setSelectProduct] = useState<ProductType | null>(null);
  const serverLocationsFetchedRef = useRef(false);

  const mainLocation = serverLocations?.find(
    (location) => location.isMainLocation,
  );
  const initialLocationId = serverLocationsFetchedRef.current
    ? mainLocation?.id
    : 1;
  const [selectedLocationId, setSelectedLocationId] = useState<
    number | undefined
  >(initialLocationId);

  const {
    products,
    fetchNextPage,
    hasNextPage,
    status: productStatus,
    isFetchingNextPage,
    refetch: refetchProductList,
  } = useProducts(selectedLocationId, selectedCategoryId);

  const { observeTarget } = useIntersectionObserver({
    inviewCallback: () => {
      if (hasNextPage) fetchNextPage();
    },
  });

  useEffect(() => {
    if (serverLocations && !serverLocationsFetchedRef.current) {
      const mainLocId = serverLocations.find(
        (location) => location.isMainLocation,
      )?.id;
      mainLocId && setSelectedLocationId(mainLocId);
      refetchProductList();
      serverLocationsFetchedRef.current = true;
    }
  }, [serverLocations]);

  const onOpenDetail = (id: number) => {
    navigate(`${PATH.detail}/${id}`);
  };

  const onOpenCategory = () => {
    setShouldSlideLeft();
  };

  const onSelectLocation = (id: number) => {
    setSelectedLocationId(id);
  };

  const onSelectCategory = (id: number | null) => {
    setSelectedCategoryId(id);
  };

  const onAlertOpen = (product: ProductType) => {
    onOpenAlert('product');
    setSelectProduct(product);
  };

  const onDeleteProduct = (id?: number) => {
    if (!id) return;
    onCloseAlert({ currentDim: null });
    deleteProductMutation.mutate(id);
  };

  const renderSkeletons = (length: number) => {
    return Array.from({ length }).map((_, index) => (
      <SkeletonListItem key={index} />
    ));
  };

  const shouldShowSkeletons = productStatus === 'loading' || isFetchingNextPage;
  const shouldShowEndOfData =
    !hasNextPage && productStatus !== 'loading' && productStatus !== 'error';

  const selectedLocation = serverLocations?.find(
    (location) => location.id === selectedLocationId,
  );

  const mainLocationName =
    isLogin && selectedLocation
      ? modifiedLocationName(selectedLocation.name)
      : modifiedLocationName('역삼1동');

  const locations = isLogin
    ? serverLocations
    : [{ id: 1, name: '역삼1동', isMainLocation: true }];

  return (
    <>
      <div css={(theme) => pageStyle(theme)}>
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
              <Dropdown
                opener={
                  <Button
                    variant="text"
                    className="button__topbar"
                    disabled={!serverLocations}
                  >
                    {mainLocationName}
                    <ChevronDown />
                  </Button>
                }
                menu={
                  <MenuBox>
                    {/* {locationStatus === 'loading' && (
                      <MenuItem>로딩스피너</MenuItem>
                    )}
                    {locationStatus === 'error' && (
                      <MenuItem>동네 정보를 가져오지 못했습니다</MenuItem>
                    )} */}
                    {locations &&
                      locations.map((location) => (
                        <MenuItem
                          key={location.id}
                          state={
                            selectedLocationId === location.id
                              ? 'selected'
                              : 'default'
                          }
                          onClick={() => onSelectLocation(location.id)}
                        >
                          {location.name}
                        </MenuItem>
                      ))}
                    {isLogin && (
                      <MenuItem onClick={onOpenModal}>
                        내 동네 설정하기
                      </MenuItem>
                    )}
                  </MenuBox>
                }
              />
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
          <Button
            variant="fab"
            size="l"
            className="button__add"
            onClick={() => navigate(PATH.newProduct)}
          >
            <Plus />
          </Button>
          <div className="list-box-container">
            <ListBox>
              {productStatus === 'error' && (
                <div className="data-status-info">
                  상품을 불러오지 못했어요!
                  <br />
                  연결을 확인해주세요
                </div>
              )}

              {products?.map((product) => (
                <ListItem
                  key={product.id}
                  product={product}
                  onOpenDetail={() => onOpenDetail(product.id)}
                  onAlertOpen={() => onAlertOpen(product)}
                />
              ))}

              {shouldShowSkeletons && <>{renderSkeletons(10)}</>}
            </ListBox>
            {shouldShowEndOfData && (
              <div className="data-status-info">
                <p>전부 살펴 봤어요!</p>
              </div>
            )}
            <LocationModal locationList={serverLocations} />
            <div ref={observeTarget} css={obseverStyle}></div>
          </div>
        </>
      </div>

      <Alert isOpen={alertSource === 'product'} currentDim={currentDim}>
        <AlertContent>'{selectProduct?.title}'을 삭제하시겠어요?</AlertContent>
        <AlertButtons
          buttonText="취소"
          onDelete={() => onDeleteProduct(selectProduct?.id)}
        />
      </Alert>

      <Category
        categories={categories}
        selectedCategoryId={selectedCategoryId}
        onSelectCategory={onSelectCategory}
      />
    </>
  );
};

const pageStyle = (theme: Theme) => {
  return css`
    ::-webkit-scrollbar {
      display: none;
    }
    height: 100vh;
    overflow-y: auto;

    .list-box-container {
      height: 100vh;
      padding-top: 56px;
      margin-bottom: 64px;
      overflow-y: auto;
      overflow-x: hidden;

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
    }

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

const obseverStyle = css`
  height: 20px;
  width: 100%;
`;
