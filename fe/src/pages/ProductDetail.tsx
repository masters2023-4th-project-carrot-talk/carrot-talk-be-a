import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';

import { Theme, css } from '@emotion/react';

import {
  ChevronDown,
  ChevronLeft,
  Dots,
  Heart,
} from '@components/common/icons';
import { TopBar } from '@/components/common/topBar/TopBar';
import { RightButton } from '@/components/common/topBar/RightButton';
import { LeftButton } from '@/components/common/topBar/LeftButton';
import { Button } from '@/components/common/button/Button';
import { getUserInfo } from '@/utils/localStorage';
import { PostBar } from '@/components/common/actionBar/PostBar';
import { formatPrice } from '@/utils/formatPrice';
import { Dropdown } from '@/components/common/dropdown/Dropdown';
import { MenuBox } from '@/components/common/menu/MenuBox';
import { MenuItem } from '@/components/common/menu/MenuItem';
import { formatTimeStamp } from '@/utils/formatTimeStamp';
import {
  useDeleteProduct,
  useEditLikeStatus,
  useEditProductStatus,
  useProductDetailQuery,
} from '@/queries/products';
import { Alert } from '@/components/common/alert/Alert';
import { AlertContent } from '@/components/common/alert/AlertContent';
import { AlertButtons } from '@/components/common/alert/AlertButtons';
import { usePopupStore } from '@/stores/popupStore';

export const ProductDetail: React.FC = () => {
  const { id } = useParams();
  const { product, seller, imageUrls, status, error } = useProductDetailQuery(
    Number(id),
  );
  const deleteProductMutation = useDeleteProduct('detail');
  const editProductStatusMutation = useEditProductStatus('detail');
  const { isOpen, currentDim, togglePopup, setCurrentDim } = usePopupStore();
  const [currentIndex, setCurrentIndex] = useState(1);

  const randomGitProfile =
    'https://avatars.githubusercontent.com/u/52685259?v=4';
  const formattedPrice = formatPrice(product?.price);
  const formattedTimeStamp = formatTimeStamp(product?.createdAt);
  // const isAuthor = getUserInfo() && getUserInfo()?.id === seller?.id;
  const isAuthor = true;
  const navigate = useNavigate();
  // const isLiked = true;
  // TODO 상단 네비게이션은 해당 화면 첫 진입시 배경이 투명하다가, 스크롤을 하면 배경이 불투명하고 본문과 구분선이 표시되도록 한다. topbar에 ref boolean
  // TODO alert 훅으로 빼기
  // TODO

  const editLikeStatusMutation = useEditLikeStatus();

  const onAlertOpen = () => {
    togglePopup('alert', true);
    setCurrentDim('alert');
  };

  const onAlertClose = () => {
    togglePopup('alert', false);
    setCurrentDim(null);
  };

  const onDeleteProduct = (id?: number) => {
    if (id == null) return;
    onAlertClose();
    deleteProductMutation.mutate(id);
  };

  const onToggleLike = () => {
    if (id) {
      editLikeStatusMutation.mutate(Number(id));
    }
  };

  const menuRowsByStatus = [
    {
      id: 1,
      name: '판매중',
      onClick: () =>
        editProductStatusMutation.mutate({
          id: Number(id),
          status: '판매중',
        }),
    },
    {
      id: 2,
      name: '예약중',
      onClick: () =>
        editProductStatusMutation.mutate({
          id: Number(id),
          status: '예약중',
        }),
    },
    {
      id: 3,
      name: '판매완료',
      onClick: () =>
        editProductStatusMutation.mutate({
          id: Number(id),
          status: '판매완료',
        }),
    },
  ];

  return (
    <div css={(theme) => pageStyle(theme, product?.isLiked)}>
      <TopBar transparent>
        {isAuthor && (
          <RightButton>
            <Dropdown
              align="right"
              opener={
                <Button variant="text" className="button__status">
                  <Dots />
                </Button>
              }
              menu={
                <MenuBox>
                  <MenuItem
                    onClick={() => {
                      // navigate(`/products/${id}/add?`);
                    }}
                  >
                    게시글 수정
                  </MenuItem>
                  <MenuItem variant="warning" onClick={onAlertOpen}>
                    삭제
                  </MenuItem>
                </MenuBox>
              }
            />
          </RightButton>
        )}

        <LeftButton>
          <Button
            className="button__back"
            variant="text"
            onClick={() => {
              navigate(-1);
            }}
          >
            <ChevronLeft />
            뒤로
          </Button>
        </LeftButton>
      </TopBar>
      <div className="page-content">
        <div className="thumbnail-box">
          <div className="thumbnail-box-track">
            <img src={randomGitProfile} />
            <img src={randomGitProfile} />
            <img src={randomGitProfile} />
          </div>
          <div className="thumbnail-page-nav">
            {currentIndex} / {imageUrls?.length}
          </div>
        </div>

        <div className="page-content-info">
          <div className="seller">
            <p className="seller-label">판매자 정보</p>
            <p className="seller-name">{seller?.nickname}</p>
          </div>
          {isAuthor && (
            <Dropdown
              opener={
                <Button
                  variant="text"
                  state="default"
                  className="button__status"
                >
                  <p>{product?.status}</p>
                  <ChevronDown />
                </Button>
              }
              menu={
                <MenuBox>
                  {menuRowsByStatus.map((row) => (
                    <MenuItem key={row.id} onClick={row.onClick}>
                      {row.name}
                    </MenuItem>
                  ))}
                </MenuBox>
              }
            ></Dropdown>
          )}
          <div className="description">
            <div className="description-title">
              <p className="title">{product?.title}</p>
              <p className="category">
                {product?.category} · {formattedTimeStamp}
              </p>
            </div>
            <div className="description-body">{product?.content}</div>
            <div className="description-caption">
              <div>
                <span>채팅</span>
                <span>{product?.chatCount}</span>
              </div>
              <div>
                <span>관심</span>
                <span>{product?.likeCount}</span>
              </div>
              <div>
                <span>조회</span>
                <span>{product?.hits}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <PostBar isLiked={true}>
        <div className="info">
          <Heart className="like-icon" onClick={onToggleLike} />
          {formattedPrice}
        </div>
        {isAuthor ? (
          <Button
            variant="rectangle"
            size="s"
            state="active"
            onClick={() => {}}
          >
            대화 중인 채팅방{/* count가 추가될 수 있습니다 */}
          </Button>
        ) : (
          <Button
            variant="rectangle"
            size="s"
            state="active"
            onClick={() => {}}
          >
            채팅하기
          </Button>
        )}
      </PostBar>
      <Alert isOpen={isOpen.alert} currentDim={currentDim}>
        <AlertContent>'{product?.title}'을 삭제하시겠어요?</AlertContent>
        <AlertButtons
          buttonText="취소"
          onDelete={() => onDeleteProduct(Number(id))}
        />
      </Alert>
    </div>
  );
};

const pageStyle = (theme: Theme, isLiked: boolean | undefined) => {
  return css`
    scroll-behavior: smooth;
    ::-webkit-scrollbar {
      display: none;
    }
    height: 100vh;

    .button__back {
      color: ${theme.color.accent.text};
      path: red;
    }

    .page-content {
      margin-top: -64px;
      padding-bottom: 64px;
      box-sizing: border-box;
    }

    .thumbnail-box {
      position: relative;
      display: flex;
      height: 491px;
      width: 100%;
      border: 1px solid red;

      &-track {
        display: flex;
        width: fit-content;
        border: 5px solid red;
      }

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .thumbnail-page-nav {
      position: absolute;
      bottom: 16px;
      right: 16px;
      display: inline-flex;
      padding: 8px 16px;
      align-items: flex-start;
      gap: 4px;
      border-radius: 16px;
      background: ${theme.color.neutral.backgroundBlur};

      font: ${theme.font.displayDefault12};
      color: ${theme.color.neutral.textWeak};
    }

    .page-content-info {
      padding: 16px;
      display: flex;
      gap: 16px;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;

      .seller {
        border-radius: 12px;
        background: ${theme.color.neutral.backgroundWeak};
        display: flex;
        box-sizing: border-box;
        width: 100%;
        padding: 16px;
        justify-content: space-between;
        align-items: center;

        &-label {
          font: ${theme.font.displayDefault16};
          color: ${theme.color.neutral.text};
        }
        &-name {
          font: ${theme.font.displayStrong16};
          color: ${theme.color.neutral.textStrong};
        }
      }

      .button__status {
        display: inline-flex;
        height: 32px;
        padding: 0px 16px;
        justify-content: center;
        align-items: center;
        gap: 4px;
        flex-shrink: 0;
        border-radius: 8px;
        font: ${theme.font.displayDefault12};
        color: ${theme.color.neutral.textStrong};

        p {
          width: 56px;
          text-align: start;
        }
        svg {
          width: 16px;
          height: 16px;
          stroke: ${theme.color.neutral.textStrong};
        }
      }
    }

    .description {
      display: flex;
      width: 363px;
      flex-direction: column;
      align-items: flex-start;
      gap: 16px;

      &-title {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 8px;
        align-self: stretch;

        .title {
          font: ${theme.font.displayStrong20};
          color: ${theme.color.neutral.textStrong};
        }
        .category {
          font: ${theme.font.displayDefault12};
          color: ${theme.color.neutral.textWeak};
        }
      }

      &-body {
        min-width: 100%;
        border: 1px solid ${theme.color.neutral.border};
        font: ${theme.font.displayDefault16};
        color: ${theme.color.neutral.text};
      }

      &-caption {
        display: flex;
        align-items: flex-start;
        gap: 8px;
        align-self: stretch;
        font: ${theme.font.displayDefault12};
        color: ${theme.color.neutral.textWeak};

        div {
          display: flex;
          align-items: flex-start;
          gap: 4px;
        }
      }
    }

    .info {
      display: flex;
      gap: 8px;
      align-items: center;
    }

    .like-icon {
      cursor: pointer;
      stroke: ${isLiked
        ? theme.color.system.warning
        : theme.color.neutral.textStrong};
      fill: ${isLiked ? theme.color.system.warning : 'none'};
    }
  `;
};
