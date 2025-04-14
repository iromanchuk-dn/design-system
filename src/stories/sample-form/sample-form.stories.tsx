import { Meta, StoryObj } from '@storybook/react';
import SampleForm from './sample-form';

const meta: Meta = {
  title: 'Examples/Simple form',
  component: SampleForm, // Reference component for controls
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof SampleForm>;

export const Default: Story = {
  args: {},
};
