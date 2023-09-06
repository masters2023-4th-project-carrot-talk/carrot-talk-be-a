import { Theme, css } from '@emotion/react';
import { TopBar } from '../common/topBar/TopBar';
import { Title } from '../common/topBar/Title';
import { LeftButton } from '../common/topBar/LeftButton';
import { Button } from '../common/button/Button';
import { ChevronLeft } from '../common/icons';
import { useAnimation } from '@/hooks/animation';
import { Option } from './Option';

type Props = {
  categories?: CategoryType[];
  showCategory: boolean;
  onCloseCategory: () => void;
  onSelectCategory: (id: number) => void;
};

export const Category: React.FC<Props> = ({
  categories,
  showCategory,
  onCloseCategory,
  onSelectCategory,
}) => {
  // TODO 메인에서 미리 데이터가 받아와져 있어야함
  const { shouldRender, handleTransitionEnd, animationTrigger } =
    useAnimation(showCategory);

  return (
    <>
      {shouldRender && (
        <div
          css={(theme) => pageStyle(theme, animationTrigger)}
          onTransitionEnd={handleTransitionEnd}
        >
          <TopBar>
            <LeftButton>
              <Button variant="text" onClick={onCloseCategory}>
                <ChevronLeft className="button__back" />
                닫기
              </Button>
            </LeftButton>
            <Title>카테고리</Title>
          </TopBar>
          <div className="page">
            {categories &&
              categories.map((category) => (
                <Option
                  key={category.id}
                  icon={category.imageUrl}
                  label={category.name}
                  onSelectCategory={() => {
                    onSelectCategory(category.id);
                    onCloseCategory();
                  }}
                />
              ))}
          </div>
        </div>
      )}
    </>
  );
};

const pageStyle = (theme: Theme, animationTrigger: boolean) => {
  return css`
    width: 100%;
    border: 1px solid red;
    position: absolute;
    left: 0;
    top: 0;
    background-color: ${theme.color.neutral.background};
    transition: 300ms ease;

    .button__back {
      stroke: ${theme.color.neutral.textStrong};
    }

    ${animationTrigger ? '' : 'left:100%;  opacity: 0;'};

    .page {
      padding: 40px;
      box-sizing: border-box;
      border: 1px solid green;

      display: flex;
      flex-wrap: wrap;

      justify-content: flex-start;
      align-items: center;
      gap: 32px;
    }
  `;
};
