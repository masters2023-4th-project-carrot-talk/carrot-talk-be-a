import { ReactComponent as Check } from '@/assets/check.svg';
import { Button } from '@/components/common/button/Button';
import { Input } from '@/components/common/input/Input';
import { LocationModal } from '@/components/common/modal/locationModal/LocationModal';
import { LeftButton } from '@/components/common/topBar/LeftButton';
import { RightButton } from '@/components/common/topBar/RightButton';
import { Title } from '@/components/common/topBar/Title';
import { TopBar } from '@/components/common/topBar/TopBar';
import { PATH } from '@/constants/path';
import { useCheckNickname, useSignup } from '@/hooks/auth';
import { usePopupStore } from '@/store/popupStore';
import { ReactComponent as Plus } from '@assets/plus.svg';
import { Theme, css } from '@emotion/react';
import { useEffect, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

export const Signup: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [nickname, setNickname] = useState('');
  const [locations, setLocations] = useState<number[]>([]);
  const [nicknameCheckPassed, setNicknameCheckPassed] = useState(false);
  const [nicknameCheckWarning, setNicknameCheckWarning] = useState('');
  const { togglePopup, setCurrentDim } = usePopupStore();
  const { refetch: refetchNicknameCheck } = useCheckNickname(nickname);
  const { mutate: signupWithInfo } = useSignup();

  useEffect(() => {
    setNicknameCheckWarning('');
    setNicknameCheckPassed(false);
  }, [nickname]);

  if (!location.state?.isOauth) {
    return <Navigate to={PATH.auth} replace={true} />;
  }

  const invalidNickName = !/^[a-zA-Z0-9가-힣ㄱ-ㅎㅏ-ㅣ]{2,10}$/.test(nickname);
  const submitDisabled =
    invalidNickName || !nicknameCheckPassed || locations.length === 0;

  const goToAuth = () => {
    navigate(PATH.auth, { replace: true });
  };

  const changeNickname = (value: string) => {
    setNickname(value);
  };

  const requestNicknameCheck = async () => {
    if (invalidNickName || nicknameCheckPassed) {
      return;
    }
    const { data } = await refetchNicknameCheck();

    setNicknameCheckWarning(data?.errorCode?.message);
    setNicknameCheckPassed(data?.success ?? false);
  };

  const openLocationModal = () => {
    // TODO : 위치 데이터 변경
    togglePopup('modal', true);
    setCurrentDim('modal');
    setLocations([1, 2]);
  };

  const requestSignup = () => {
    signupWithInfo({
      nickname,
      mainLocationId: locations[0],
      subLocationId: locations[1],
    });
    navigate(PATH.home, { replace: true });
  };

  return (
    <>
      <TopBar>
        <Title>회원가입</Title>
        <LeftButton>
          <Button variant="text" onClick={goToAuth}>
            <span className="control-btn">닫기</span>
          </Button>
        </LeftButton>
        <RightButton>
          <Button
            variant="text"
            disabled={submitDisabled}
            onClick={requestSignup}
          >
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
                value={nickname}
                onChange={changeNickname}
                warningMessage={nicknameCheckWarning}
              />
              {nicknameCheckPassed ? (
                <Check className="nickname-form__input--check" />
              ) : (
                <Button
                  variant="rectangle"
                  state="active"
                  size="s"
                  disabled={invalidNickName}
                  onClick={requestNicknameCheck}
                >
                  중복 체크
                </Button>
              )}
            </div>
          </div>
          <div className="location__form">
            <Button
              variant="rectangle"
              state="default"
              onClick={openLocationModal}
            >
              <Plus />
              위치 추가
            </Button>
            <LocationModal />
          </div>
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
      display: flex;
      flex-direction: column;
      gap: 32px;
      margin-top: 180px;
    }

    .nickname-form {
      display: flex;
      flex-direction: column;
      gap: 8px;

      & > span {
        font: ${theme.font.displayStrong16};
        color: ${theme.color.neutral.textStrong};
      }

      .nickname-form__input {
        display: flex;
        gap: 4px;

        &--check {
          align-self: center;
          stroke: ${theme.color.accent.text};
          background-color: ${theme.color.accent.backgroundSecondary};
          border-radius: 50%;
        }
      }
    }
  `;
};
