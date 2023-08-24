import { TextButton } from './TextButton';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta = {
  title: 'Example/TextButton',
  component: TextButton,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: {
      control: { type: 'select', options: ['default', 'fab'] },
      defaultValue: 'rectangle',
    },

    size: {
      control: { type: 'select', options: ['s', 'l'] },
      defaultValue: 's',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const FabSmall: Story = {
  args: {
    variant: 'fab',
    size: 's',
    children: ' FabSmall',
  },
};

export const FabLarge: Story = {
  args: {
    variant: 'fab',
    size: 'l',
    children: 'FabLarge',
  },
};

export const Default: Story = {
  args: {
    variant: 'default',
    children: ' Default',
  },
};
