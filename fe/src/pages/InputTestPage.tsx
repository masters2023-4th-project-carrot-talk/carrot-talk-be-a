import { Input } from '@/components/common/input/Input';
import { useState } from 'react';

export const InputTestPage: React.FC = () => {
  const [value, setValue] = useState('기존 내용');
  const [price, setPrice] = useState('' as string | number);

  const onChange = (newValue: string) => {
    setValue(newValue);
  };

  const onPressEnter = () => {
    console.log('onPressEnter', value);
  };

  return (
    <div>
      <h2>InputTestPage</h2>
      <Input variant="ghost" {...{ value, onChange, onPressEnter }} />
      <Input
        variant="ghost"
        label="₩"
        value={price}
        onChange={(newValue) => setPrice(newValue)}
        warningMessage="돈이 부족합니다!"
      ></Input>
    </div>
  );
};
