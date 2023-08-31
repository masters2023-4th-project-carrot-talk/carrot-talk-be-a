import { Button } from '@/components/common/button/Button';
import { Input } from '@/components/common/input/Input';
import { LeftButton } from '@/components/common/topBar/LeftButton';
import { RightButton } from '@/components/common/topBar/RightButton';
import { Title } from '@/components/common/topBar/Title';
import { TopBar } from '@/components/common/topBar/TopBar';
import { ReactComponent as Plus } from '@assets/plus.svg';
import { Theme, css } from '@emotion/react';

export const Signup: React.FC = () => {
  return (
    <>
      <TopBar>
        <Title>회원가입</Title>
        <LeftButton>
          <Button variant="text">
            <span className="control-btn">닫기</span>
          </Button>
        </LeftButton>
        <RightButton>
          <Button variant="text" disabled>
            <span className="control-btn">확인</span>
          </Button>
        </RightButton>
      </TopBar>
      <div css={(theme) => pageStyle(theme)}>
        <div className="signup-form">
          <div className="nickname-form">
            <span>닉네임</span>
            <div className="nickname-form__input">
              <Input
                variant="outlined"
                radius="s"
                placeholder="2~10글자 닉네임을 입력하세요"
                minLength={2}
                maxLength={10}
              />
              <Button variant="rectangle" state="active" size="s" disabled>
                중복 체크
              </Button>
            </div>
          </div>
          <Button variant="rectangle" state="default">
            <Plus />
            위치 추가
          </Button>
        </div>
      </div>
    </>
  );
};

const pageStyle = (theme: Theme) => {
  return css`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 32px;

    .signup-form {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 32px;
      margin-top: 180px;
    }

    .nickname-form {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 8px;

      & > span {
        font: ${theme.font.displayStrong16};
        color: ${theme.color.neutral.textStrong};
      }
    }

    .nickname-form__input {
      display: flex;
      gap: 4px;
    }

    & svg {
      stroke: ${theme.color.accent.textWeak};
    }
  `;
};
