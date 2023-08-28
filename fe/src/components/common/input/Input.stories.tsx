import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';

const meta: Meta<typeof Input> = {
  title: 'Example/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: {
      control: {
        type: 'select',
        options: ['filled', 'outlined', 'ghost'],
        defaultValue: 'filled',
      },
    },
    radius: {
      control: {
        type: 'select',
        options: ['s', 'l'], 
        defaultValue: undefined,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: 'filled',
    placeholder: '내용을 입력하세요'
  },
};

export const Address: Story = {
  args: {
    variant: 'filled',
    radius: 's',
    placeholder: '동명(읍, 면)으로 검색(ex. 서초동)'
  },
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    placeholder: '내용을 입력하세요'
  },
};

export const Chat: Story = {
  args: {
    variant: 'outlined',
    radius: 'l',
    placeholder: '내용을 입력하세요'
  }
}

export const Signup: Story = {
  args: {
    variant: 'outlined',
    radius: 's',
    placeholder: '내용을 입력하세요' 
  }
} 
