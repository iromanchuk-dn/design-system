import React from 'react';

export const textFieldSchemas = ['info', 'success', 'error', 'warning'] as const;
export type TextFieldSchema = (typeof textFieldSchemas)[number];

export interface DsTextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /**
   * Color schema of the text field
   * @default 'info'
   */
  schema?: TextFieldSchema;
  /**
   * Label for the text field
   */
  label: string;
  /**
   * Whether the text field is required
   * @default false
   */
  required?: boolean;
  /**
   * Whether the text field is disabled
   * @default false
   */
  disabled?: boolean;
  /**
   * Icon to display on the left side of the text field
   */
  icon?: string;
  /**
   * Message to display below the text field
   */
  message?: string;
  /**
   * Icon to display next to the message
   */
  messageIcon?: React.ReactNode;
}
