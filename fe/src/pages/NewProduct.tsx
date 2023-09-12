import { EditBar } from '@/components/common/actionBar/EditBar';
import { Button } from '@/components/common/button/Button';
import { Camera, MapPinFilled } from '@/components/common/icons';
import { PictureItem } from '@/components/common/imageBox/PictureItem';
import { Input } from '@/components/common/input/Input';
import { LeftButton } from '@/components/common/topBar/LeftButton';
import { RightButton } from '@/components/common/topBar/RightButton';
import { Title } from '@/components/common/topBar/Title';
import { TopBar } from '@/components/common/topBar/TopBar';
import { Theme, css } from '@emotion/react';

export const NewProduct: React.FC = () => {
  const randomGitProfile =
    'https://avatars.githubusercontent.com/u/48426991?v=4';

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
          <div className="image-input__container">
            <button className="image-input__add-btn">
              <Camera />
              <span>0/10</span>
            </button>
            <PictureItem
              size="m"
              imageUrl={randomGitProfile}
              label="대표 사진"
            />
            <PictureItem size="m" imageUrl={randomGitProfile} />
            <PictureItem size="m" imageUrl={randomGitProfile} />
            <PictureItem size="m" imageUrl={randomGitProfile} />
            <PictureItem size="m" imageUrl={randomGitProfile} />
          </div>
        </div>
        <div className="title-input">
          <Input variant="ghost" placeholder="내용을 입력하세요" />
        </div>
        <div className="price-input">
          <Input variant="ghost" label="₩" placeholder="가격을 입력하세요" />
        </div>
        <div className="content-input">
          <textarea placeholder="역삼 1동에 올릴 게시물 내용을 작성해주세요.(판매금지 물품은 게시가 제한될 수 있어요.)" />
        </div>
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
    padding-bottom: 16px;
    border-bottom: 0.8px solid ${theme.color.neutral.border};
  }

  & .image-input {
    padding-top: 8px;
    overflow-x: auto;
    scroll-behavior: smooth;

    &::-webkit-scrollbar {
      display: none;
    }

    &__container {
      display: flex;
      gap: 16px;
    }

    &__add-btn {
      width: 80px;
      height: 80px;
      padding: 16px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 4px;
      border-radius: 16px;
      border: 0.8px solid ${theme.color.neutral.border};

      & > svg {
        stroke: ${theme.color.neutral.textStrong};
      }
    }
  }

  & .content-input textarea {
    width: 100%;
    font: ${theme.font.availableDefault16};

    &::placeholder {
      color: ${theme.color.neutral.textWeak};
    }
  }
`;
