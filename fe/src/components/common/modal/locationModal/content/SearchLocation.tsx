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
    <div css={SearchLocationStyle}>
      <input type="text" />
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

const SearchLocationStyle = css`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
