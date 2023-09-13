import { Theme, css } from '@emotion/react';
import { ImageBox } from '../imageBox/ImageBox';
import { Message, Heart, Dots } from '../icons';
import { Button } from '../button/Button';
import { StatusBadge } from '../statusBadge/StatusBadge';
import { formatTimeStamp } from '@utils/formatTimeStamp';
import { formatPrice } from '@utils/formatPrice';
import { formatCount } from '@utils/formatCount';
import { getUserInfo } from '@utils/localStorage';
import { Dropdown } from '../dropdown/Dropdown';
import { MenuBox } from '../menu/MenuBox';
import { MenuItem } from '../menu/MenuItem';
import { useEditProductStatus } from '@/queries/products';

type Props = {
  product: ProductType; // TODO : product 타입 변경
  onOpenDetail?: () => void;
  onAlertOpen?: () => void;
};
// 게시글 수정: 해당 게시물을 수정하는 화면으로 이동한다.
// 예약 중 상태로 전환: 이 옵션을 누르면 상품의 상태가 예약중으로 전환된다. [더보기]버튼에는 [게시글 수정], [판매 중 상태로 전환], [판매 완료 상태로 전환], [삭제]가 보이도록 한다.
// 판매 완료 상태로 전환: 이 버튼을 누를 경우, ‘판매 완료된 상품 목록’에서 해당 제품이 보이도록 한다. [더보기]버튼에는 [게시글 수정], [판매 중 상태로 전환], [예약 중 상태로 전환], [삭제]가 보이도록 한다.
// 삭제: 해당 게시물을 삭제한다. 이 버튼을 누르면 정말로 해당 게시물을 삭제할 것인지 묻는 알럿창이 뜨도록한다.

export const ListItem: React.FC<Props> = ({
  product,
  onOpenDetail,
  onAlertOpen,
}) => {
  const editProductStatusMutation = useEditProductStatus('home');

  const formattedPrice = formatPrice(product.price);
  const formattedTimeStamp = formatTimeStamp(product.createdAt);
  const formattedChatCount = formatCount(product.chatCount);
  const formattedLikeCount = formatCount(product.likeCount);
  // const isAuthor = getUserInfo()
  //   ? getUserInfo()?.id === product.sellerId
  //   : false;
  const isAuthor = true;

  const menuRowsByStatus = {
    판매중: [
      {
        id: 1,
        name: '예약 중 상태로 전환',
        onClick: () =>
          editProductStatusMutation.mutate({
            id: product.id,
            status: '예약중',
          }),
      },
      {
        id: 2,
        name: '판매 완료 상태로 전환',
        onClick: () =>
          editProductStatusMutation.mutate({
            id: product.id,
            status: '판매완료',
          }),
      },
    ],
    예약중: [
      {
        id: 1,
        name: '판매 중 상태로 전환',
        onClick: () =>
          editProductStatusMutation.mutate({
            id: product.id,
            status: '판매중',
          }),
      },
      {
        id: 2,
        name: '판매 완료 상태로 전환',
        onClick: () =>
          editProductStatusMutation.mutate({
            id: product.id,
            status: '판매완료',
          }),
      },
    ],
    판매완료: [
      {
        id: 1,
        name: '판매 중 상태로 전환',
        onClick: () =>
          editProductStatusMutation.mutate({
            id: product.id,
            status: '판매중',
          }),
      },
      {
        id: 2,
        name: '예약 중 상태로 전환',
        onClick: () =>
          editProductStatusMutation.mutate({
            id: product.id,
            status: '예약중',
          }),
      },
    ],
  };

  return (
    <>
      <li css={listItemStyle} onClick={onOpenDetail}>
        <ImageBox imageUrl={product.imageUrl} size="l" />
        <div className="text-area">
          <div className="text-area__information">
            <div className="text-area__information-title">
              <span>{product.name}</span>
              {isAuthor && (
                <Dropdown
                  align="right"
                  opener={
                    <Button variant="text">
                      <Dots />
                    </Button>
                  }
                  menu={
                    <MenuBox>
                      <MenuItem onClick={() => {}}>게시글 수정</MenuItem>
                      {menuRowsByStatus[product.status].map((row) => (
                        <MenuItem key={row.id} onClick={row.onClick}>
                          {row.name}
                        </MenuItem>
                      ))}
                      <MenuItem variant="warning" onClick={onAlertOpen}>
                        삭제
                      </MenuItem>
                    </MenuBox>
                  }
                ></Dropdown>
              )}
            </div>
            <div className="text-area__information-location">
              {product.location} · {formattedTimeStamp}
            </div>
            <div className="text-area__information-state">
              {product.status && <StatusBadge state={product.status} />}
              {formattedPrice}
            </div>
          </div>

          <div className="text-area__icons">
            {product.chatCount > 0 && (
              <div>
                <Message />
                <span>{formattedChatCount}</span>
              </div>
            )}
            {product.likeCount > 0 && (
              <div>
                <Heart />
                <span>{formattedLikeCount}</span>
              </div>
            )}
          </div>
        </div>
      </li>
    </>
  );
};

const listItemStyle = (theme: Theme) => {
  return css`
    box-sizing: border-box;
    display: flex;
    padding: 16px 0px;
    align-items: flex-start;
    gap: 16px;
    align-self: stretch;

    .text-area {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: flex-end;
      flex: 1 0 0;
      align-self: stretch;

      &__information {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 4px;
        align-self: stretch;

        &-title {
          display: flex;
          min-height: 24px;
          max-height: 48px;
          align-items: flex-start;
          justify-content: space-between;
          gap: 4px;
          align-self: stretch;
          font: ${theme.font.displayDefault16};
          color: ${theme.color.neutral.textStrong};

          button {
            padding: 0;
          }

          svg {
            fill: ${theme.color.neutral.textStrong};
          }
        }

        &-location {
          font: ${theme.font.displayDefault12};
          color: ${theme.color.neutral.textWeak};
        }

        &-state {
          display: flex;
          align-items: center;
          gap: 4px;
          font: ${theme.font.displayStrong16};
          color: ${theme.color.neutral.textStrong};
        }
      }

      &__icons {
        display: flex;
        align-items: center;
        gap: 8px;

        font: ${theme.font.displayDefault12};
        color: ${theme.color.neutral.textWeak};
        svg {
          width: 16px;
          height: 16px;
          stroke: ${theme.color.neutral.textWeak};
        }

        > div {
          display: flex;
          align-items: center;
          gap: 4px;
        }
      }
    }

    border-bottom: 0.8px solid ${theme.color.neutral.border};
  `;
};
