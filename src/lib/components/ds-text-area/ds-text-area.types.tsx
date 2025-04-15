import React from 'react';

export const textareaSchemas = ['info', 'success', 'error', 'warning'] as const;
export type TextareaSchema = (typeof textareaSchemas)[number];

export interface DsTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  /**
   * Visual schema
   * @default 'info'
   */
  schema?: TextareaSchema;
  /**
   * Label text
   */
  label: string;
  /**
   * Marks the field as required
   */
  required?: boolean;
  /**
   * Disables the textarea
   */
  disabled?: boolean;
  /**
   * Icon to display on the left side of the text field
   */
  icon?: string;
  /**
   * Message under the textarea
   */
  message?: string;
  /**
   * Icon shown next to message
   */
  messageIcon?: React.ReactNode;
}
