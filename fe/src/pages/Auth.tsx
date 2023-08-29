import { ReactComponent as UserCircle } from '@/assets/user-circle.svg';
import { Button } from '@/components/common/button/Button';
import { Title } from '@/components/common/topBar/Title';
import { TopBar } from '@/components/common/topBar/TopBar';
import kakaoLogin from '@assets/kakao_login.png';
import { Theme, css } from '@emotion/react';
import { useState } from 'react';

export const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);

  const onClickLogin = () => {
    setIsLogin(true);
  };

  const onClickLogout = () => {
    setIsLogin(false);
  };

  return (
    <>
      <TopBar>
        <Title>내 계정</Title>
      </TopBar>
      <div css={pageStyle}>
        {isLogin ? (
          <>
            <div className="auth__info">
              <div className="user__profile">
                <UserCircle />
              </div>
              <div className="user__name">사용자 이름</div>
            </div>
            <div className="button__wrapper">
              <Button
                variant="rectangle"
                state="active"
                onClick={onClickLogout}
              >
                로그아웃
              </Button>
            </div>
          </>
        ) : (
          <>
            <div className="auth__info">로그인이 필요합니다.</div>
            <div className="button__wrapper">
              <Button variant="text" onClick={onClickLogin}>
                <img src={kakaoLogin} alt="카카오 소셜 로그인" />
              </Button>
            </div>
          </>
        )}
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
    font: ${theme.font.displayStrong16};
    color: ${theme.color.neutral.textStrong};
    gap: 24px;

    .auth__info {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin-top: 180px;
      gap: 16px;
    }

    .user__profile {
      display: flex;
      justify-content: center;

      & svg {
        width: 100px;
        height: 100px;
        stroke: ${theme.color.neutral.text};
      }
    }

    .user__name {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .button__wrapper {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  `;
};
