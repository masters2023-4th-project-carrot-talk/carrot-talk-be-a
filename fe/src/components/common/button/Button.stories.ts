import type { Meta, StoryObj } from '@storybook/react';

import { Button } from './Button';

const meta: Meta = {
  title: 'Example/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: {
      control: { type: 'select', options: ['rectangle', 'category'] },
      defaultValue: 'rectangle',
    },
    state: {
      control: { type: 'select', options: ['default', 'active'] },
      defaultValue: 'default',
    },
    size: {
      control: { type: 'select', options: ['s', 'l'] },
      defaultValue: 's',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const RectangleDefault: Story = {
  args: {
    variant: 'rectangle',
    state: 'default',
    size: 's',
    children: 'Rectangle Default',
  },
};

export const RectangleActive: Story = {
  args: {
    variant: 'rectangle',
    state: 'active',
    size: 'l',
    children: 'Rectangle Active',
  },
};

export const CategoryDefault: Story = {
  args: {
    variant: 'category',
    state: 'default',
    children: 'Category Default',
  },
};

export const CategoryActive: Story = {
  args: {
    variant: 'category',
    state: 'active',
    children: 'Category Active',
  },
};
