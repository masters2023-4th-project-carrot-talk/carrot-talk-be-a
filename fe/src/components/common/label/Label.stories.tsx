import type { Meta, StoryObj } from '@storybook/react';
import { Label } from './Label';

const meta: Meta = {
  title: 'Label',
  component: Label,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    state: {
      control: { type: 'radio', options: ['예약중', '판매중', '판매완료'] },
      defaultValue: '예약중',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const LabelDefault: Story = {
  args: {
    state: '예약중',
  },
};
