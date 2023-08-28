import { Theme, css } from '@emotion/react';

type Props = {
  text: string;
  onClick: () => void;
};

export const ModalListItem: React.FC<Props> = ({ text, onClick }) => {
  return (
    <li onClick={onClick} css={ModalListItemStyle}>
      <span>{text}</span>
    </li>
  );
};

const ModalListItemStyle = (theme: Theme) => {
  return css`
    display: flex;
    padding: 16px 0px;
    flex-direction: column;
    align-items: flex-start;
    align-self: stretch;

    font: ${theme.font.availableDefault16};
    color: ${theme.color.neutral.text};

    &:active {
      font: ${theme.font.enabledStrong16};
      color: ${theme.color.neutral.textStrong};
    }

    &:hover {
      cursor: pointer;
      font: ${theme.font.enabledStrong16};
      color: ${theme.color.neutral.textStrong};
    }
  `;
};
