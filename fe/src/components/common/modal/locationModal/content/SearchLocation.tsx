import { Input } from '@/components/common/input/Input';
import { ModalListItem } from '../../ModalListItem';
import { css } from '@emotion/react';
type Props = {
  // TODO : locationList의 타입 변경
  locationList: {
    id: number;
    text: string;
  }[];
};

export const SearchLocation: React.FC<Props> = ({ locationList }) => {
  return (
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
      <ul>
        {locationList.map((location) => (
          <ModalListItem
            key={location.id}
            text={location.text}
            onClick={() => {}}
          />
        ))}
      </ul>
    </div>
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
