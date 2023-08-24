import { Children, FC, ReactNode, isValidElement, useState } from 'react';

type Props = {
  children?: ReactNode;
};

const getDropdownButton = (childrenArray: ReactNode[]) => {
  const button = childrenArray.find((child) => {
    return isValidElement(child) && child.type === 'button';
  });

  return button;
};

const getDropdownList = (childrenArray: ReactNode[]) => {
  const list = childrenArray.find((child) => {
    return isValidElement(child) && child.type === 'ul';
  });

  return list;
};

export const Dropdown: FC<Props> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const childrenArray = Children.toArray(children);

  const button = getDropdownButton(childrenArray);
  const list = getDropdownList(childrenArray);

  if (!button || !list) {
    return null;
  }

  return (
    <>
      <div onClick={() => setIsOpen(true)}>{button}</div>
      {isOpen && list}
    </>
  );
};
