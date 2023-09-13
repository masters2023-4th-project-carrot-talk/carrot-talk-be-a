import { useState } from 'react';

type InputType<T> =
  | {
      initialValue: T;
    }
  | {
      initialValue: T;
      warningMessage: string;
      validator: (value: T) => boolean;
    };

type ReturnType<T> = {
  value: T;
  onChangeValue: (value: T) => void;
  isValidValue: boolean;
  warningMessage: string;
};

export const useInput = <T>(props: InputType<T>): ReturnType<T> => {
  const [value, setValue] = useState(props.initialValue);

  const onChangeValue = (value: T) => {
    setValue(value);
  };

  if ('validator' in props) {
    return {
      value,
      onChangeValue,
      isValidValue: props.validator(value),
      warningMessage: props.warningMessage,
    };
  }

  return {
    value,
    onChangeValue,
    isValidValue: true,
    warningMessage: '',
  };
};
