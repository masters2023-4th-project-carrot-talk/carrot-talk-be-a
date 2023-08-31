import { useState } from 'react';
import { Input } from '@/components/common/input/Input';
import { ModalListItem } from '../../ModalListItem';
import { css } from '@emotion/react';
import { ModalHeader } from '../../ModalHeader';
import { usePopupStore } from '@/store/popupStore';
type Props = {
  // TODO : locationList의 타입 변경
  onToggleContent: (content: 'control' | 'search') => void;
};

export const SearchLocation: React.FC<Props> = ({ onToggleContent }) => {
  const { togglePopup, setCurrentDim } = usePopupStore();
  // TODO : 검색어 단위마다 localist를 받아와야함
  // TODO: 검색후 클릭시 대표 동네로 설정하면서 모달을 닫아버려야함
  // TODO: localist는 없어져야함

  const [locationList, setLocationList] = useState<LocationType[]>([]);

  const onCloseModal = () => {
    togglePopup('modal', false);
    setCurrentDim(null);
    onToggleContent('control');
  };

  return (
    <>
      <ModalHeader
        onNavigateBack={() => onToggleContent('control')}
        onCloseModal={onCloseModal}
      />
      <div css={searchLocationStyle}>
        <div className="input__search">
          <Input
            onChange={() => {}}
            onPressEnter={() => {}}
            placeholder="동명(읍, 면)으로 검색(ex. 서초동)"
            radius="s"
            variant="filled"
          />
        </div>

        {locationList && (
          <ul>
            {locationList.map((location) => (
              <ModalListItem
                key={location.id}
                name={location.name}
                onClick={() => {}}
              />
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

const searchLocationStyle = css`
  width: 100%;
  display: flex;
  flex-direction: column;

  .input__search {
    padding: 0 16px;
  }
`;
