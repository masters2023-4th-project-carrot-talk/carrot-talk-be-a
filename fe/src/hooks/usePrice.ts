import { useInput } from './useInput';

type PriceInputReturnType = {
  price: string;
  isValidPrice: boolean;
  priceWarningMessage: string;
  onChangePrice: (price: string) => void;
};

export const usePrice = (initialPrice: string = ''): PriceInputReturnType => {
  const { value, onChangeValue, isValidValue, warningMessage } = useInput({
    initialValue: initialPrice,
    validator: (value: string) => /^[0-9,]*$/.test(value), // 숫자와 쉼표(,)만 입력 가능
    warningMessage: '숫자와 쉼표(,)만 입력 가능합니다.',
  });

  // 숫자만으로 이루어졌는지 확인하는 함수
  const priceValidator = (price: string) => /^[0-9]*$/.test(price);

  const onChangePrice = (price: string) => {
    if (price === '') {
      onChangeValue(price);
      return;
    }

    const priceWithoutComma = price.replace(/,/g, '');

    if (!priceValidator(priceWithoutComma) || priceWithoutComma.length > 10) {
      return;
    }

    onChangeValue(Number(priceWithoutComma).toLocaleString());
  };

  return {
    price: value,
    isValidPrice: isValidValue,
    priceWarningMessage: warningMessage,
    onChangePrice,
  };
};
