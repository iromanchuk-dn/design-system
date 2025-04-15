import type { Meta, StoryObj } from '@storybook/react';
import DsTextArea from './ds-text-area';
import { textFieldSchemas } from '@design-system/ui';

const meta: Meta<typeof DsTextArea> = {
  title: 'Design System/TextArea',
  component: DsTextArea,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    schema: {
      control: { type: 'select' },
      options: textFieldSchemas,
      description: 'Text field color schema',
      table: {
        defaultValue: {
          summary: textFieldSchemas[0],
        },
      },
    },
    label: {
      control: 'text',
      description: 'Label for the text field',
    },
    required: {
      control: 'boolean',
      description: 'Indicates if the field is required',
    },
    disabled: {
      control: 'boolean',
      description: 'Indicates if the field is disabled',
    },
    message: {
      control: 'text',
      description: 'Message to display below the text field',
    },
  },
};

export default meta;
type Story = StoryObj<typeof DsTextArea>;

export const Default: Story = {
  args: {
    label: 'Field Label',
    placeholder: 'Input',
    required: true,
    message: 'This is a message',
  },
};

export const WithIcon: Story = {
  args: {
    label: 'Field Label',
    placeholder: 'Input',
    required: true,
    icon: 'call',
    message: 'This is a message',
  },
};

export const Warning: Story = {
  args: {
    schema: 'warning',
    label: 'Field Label',
    placeholder: 'Input',
    required: true,
    message: 'This is a message',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Field Label',
    placeholder: 'Disabled Input',
    required: true,
    disabled: true,
  },
};
