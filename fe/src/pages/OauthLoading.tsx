import { PATH } from '@/constants/path';
import { useLogin } from '@/hooks/hook';
import { setAccessToken, setLoginInfo } from '@/utils/localStorage';
import kakao from '@assets/kakao.png';
import { Theme, css } from '@emotion/react';
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

export const OauthLoading: React.FC = () => {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const { data: loginResult } = useLogin(searchParams.get('code') || '');

  useEffect(() => {
    if (!loginResult) {
      return;
    }

    if (loginResult.data.isUser) {
      setLoginInfo(loginResult.data);
    } else {
      setAccessToken(loginResult.data.accessToken);
    }
    navigate(loginResult.data.isUser ? PATH.home : PATH.signup);
  }, [loginResult, navigate]);

  return (
    <>
      <div css={(theme) => pageStyle(theme)}>
        <img src={kakao} alt="" />
        <div className="loading-message">카카오 로그인 중...</div>
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
    justify-content: center;
    gap: 40px;
    font: ${theme.font.displayStrong20};
    font-size: 32px;
    color: ${theme.color.neutral.textStrong};

    & > img {
      width: 100px;
      height: 100px;
    }

    .loading-message {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  `;
};
