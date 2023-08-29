import { ReactComponent as ChevronDown } from '@/assets/chevron-down.svg';
import { ReactComponent as LayoutGrid } from '@/assets/layout-grid.svg';
import { Button } from '@/components/common/button/Button';
import { Dropdown } from '@/components/common/dropdown/Dropdown';
import { MenuBox } from '@/components/common/menu/MenuBox';
import { MenuItem } from '@/components/common/menu/MenuItem';
import { LeftButton } from '@/components/common/topBar/LeftButton';
import { RightButton } from '@/components/common/topBar/RightButton';
import { TopBar } from '@/components/common/topBar/TopBar';
import { css } from '@emotion/react';

export const Home: React.FC = () => {
  return (
    <>
      <TopBar>
        <LeftButton>
          <Dropdown>
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
      <div css={homeStyle}></div>
    </>
  );
};

const homeStyle = css`
  min-height: 100%;
`;
