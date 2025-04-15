import React from 'react';

export const controlTypes = ['input', 'textarea'] as const;
export type ControlType = (typeof controlTypes)[number];

export const controlSchemas = ['info', 'success', 'error', 'warning'] as const;
export type ControlSchema = (typeof controlSchemas)[number];

export interface DsFormControlProps
  extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  /**
   * Visual schema
   * @default 'info'
   */
  schema?: ControlSchema;
  /**
   * Label text
   */
  label: string;
  /**
   * Marks the field as required
   */
  required?: boolean;
  /**
   * Disables the control
   */
  disabled?: boolean;
  /**
   * Icon to display on the left side of the text field
   */
  icon?: string;
  /**
   * Message under the control
   */
  message?: string;
  /**
   * Icon shown next to message
   */
  messageIcon?: string;
  /**
   * Element type to render: 'input' or 'textarea'
   * @default 'input'
   */
  as?: ControlType;
}
