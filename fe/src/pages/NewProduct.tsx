import { EditBar } from '@/components/common/actionBar/EditBar';
import { Button } from '@/components/common/button/Button';
import { ChevronRight, MapPinFilled } from '@/components/common/icons';
import { Input } from '@/components/common/input/Input';
import { TextArea } from '@/components/common/input/TextArea';
import { CategoryModal } from '@/components/common/modal/categoryModal/CategoryModal';
import { LeftButton } from '@/components/common/topBar/LeftButton';
import { RightButton } from '@/components/common/topBar/RightButton';
import { Title } from '@/components/common/topBar/Title';
import { TopBar } from '@/components/common/topBar/TopBar';
import { ImageInput } from '@/components/new/ImageInput';
import { usePopupStore } from '@/stores/popupStore';
import { Theme, css } from '@emotion/react';

export const NewProduct: React.FC = () => {
  const { togglePopup, setCurrentDim } = usePopupStore();

  const title = '빈티지 롤러 스케이트';
  const price = '169,000';
  const content = `어린시절 추억의 향수를 불러 일으키는 롤러 스케이트입니다. 빈티지 특성상 사용감 있지만 전체적으로 깨끗한 상태입니다.

  촬영용 소품이나, 거실에 장식용으로 추천해 드립니다. 단품 입고 되었습니다. 새 제품으로 보존된 제품으로 전용박스까지 보내드립니다.
  
  사이즈는 235 입니다.`;

  const openCategoryModal = () => {
    togglePopup('modal', true);
    setCurrentDim('modal');
  };

  return (
    <>
      <TopBar>
        <Title>내 물건 팔기</Title>
        <LeftButton>
          <Button variant="text">
            <span className="control-btn">닫기</span>
          </Button>
        </LeftButton>
        <RightButton>
          <Button variant="text">
            <span className="control-btn">다음</span>
          </Button>
        </RightButton>
      </TopBar>
      <div css={(theme) => pageStyle(theme)}>
        <div className="image-input">
          <ImageInput />
        </div>
        <div className="title-input">
          <Input
            variant="ghost"
            value={title}
            placeholder="내용을 입력하세요"
          />
          <div className="title-input__categories">
            <div className="title-input__categories--container">
              <Button variant="category" state="active">
                기타중고물품
              </Button>
              <Button variant="category" state="default">
                여성용품
              </Button>
              <Button variant="category" state="default">
                여성잡화
              </Button>
            </div>
            <Button
              variant="text"
              className="title-input__categories--more-btn"
              onClick={openCategoryModal}
            >
              <ChevronRight />
            </Button>
          </div>
        </div>
        <div className="price-input">
          <Input
            variant="ghost"
            label="₩"
            value={price}
            placeholder="가격을 입력하세요"
          />
        </div>
        <div className="content-input">
          <TextArea
            value={content}
            onChange={() => {}}
            placeholder="역삼 1동에 올릴 게시물 내용을 작성해주세요.(판매금지 물품은 게시가 제한될 수 있어요.)"
          />
        </div>
        <CategoryModal />
      </div>
      <EditBar>
        <Button variant="text">
          <MapPinFilled fill="#000" />
          역삼1동
        </Button>
      </EditBar>
    </>
  );
};

const pageStyle = (theme: Theme) => css`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;

  & .image-input,
  & .title-input,
  & .price-input {
    display: flex;
    flex-direction: column;
    padding-bottom: 16px;
    border-bottom: 0.8px solid ${theme.color.neutral.border};
  }

  & .title-input__categories {
    display: flex;
    align-items: center;
    justify-content: space-between;

    &--container {
      display: flex;
      gap: 4px;
    }

    &--more-btn > svg {
      stroke: ${theme.color.neutral.textStrong};
    }
  }
`;
