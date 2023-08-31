import { ReactComponent as Check } from '@/assets/check.svg';
import { Button } from '@/components/common/button/Button';
import { Input } from '@/components/common/input/Input';
import { LocationModal } from '@/components/common/modal/locationModal/LocationModal';
import { LeftButton } from '@/components/common/topBar/LeftButton';
import { RightButton } from '@/components/common/topBar/RightButton';
import { Title } from '@/components/common/topBar/Title';
import { TopBar } from '@/components/common/topBar/TopBar';
import { PATH } from '@/constants/path';
import { useCheckNickname } from '@/hooks/hook';
import { usePopupStore } from '@/store/PopupStore';
import { ReactComponent as Plus } from '@assets/plus.svg';
import { Theme, css } from '@emotion/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Signup: React.FC = () => {
  // TODO : 라우트 가드
  // 앞/뒤로 가기로 회원가입 접근 금지
  // url로 직접 접근 금지(이전 경로가 /auth/redirect가 아니면 auth로 이동)

  const navigate = useNavigate();

  const [nickname, setNickname] = useState('');
  const [locations, setLocations] = useState<number[]>([]);
  const { togglePopup, setCurrentDim } = usePopupStore();
  const { nicknameCheck, refetchNicknameCheck } =
    useCheckNickname(nickname);

  const invalidNickName = nickname.length < 2 || nickname.length > 10;
  const submitDisabled = invalidNickName || locations.length === 0;

  const goToAuth = () => {
    navigate(PATH.auth, { replace: true });
  };

  const changeNickname = (value: string) => {
    setNickname(value);
  };

  const requestNicknameCheck = () => {
    if (invalidNickName || nicknameCheck?.success) {
      return;
    }
    refetchNicknameCheck();
  };

  const openLocationModal = () => {
    togglePopup('modal', true);
    setCurrentDim('modal');
    setLocations([3, 4]);
  };

  const requestSignup = () => {
    // TODO : 회원가입 api 호출
    console.log('닉네임', nickname);
    console.log('동네', locations);
    // navigate(PATH.home, { replace: true });
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
              />
              <Button
                variant="rectangle"
                state="active"
                size="s"
                disabled={invalidNickName}
                onClick={requestNicknameCheck}
              >
                {nicknameCheck?.success ? (
                  <Check className="nickname-form__input--check" />
                ) : (
                  '중복 체크'
                )}
              </Button>
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
          stroke: ${theme.color.accent.text};
        }
      }
    }
  `;
};
