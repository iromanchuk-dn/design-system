import { FileUploadRootProps } from '@ark-ui/react';
import React from 'react';
import { FileValidationResult } from './utils/file-validation';

export interface DsFileUploadProps extends Omit<FileUploadRootProps, 'children'> {
	/**
	 * Label text for the file upload
	 */
	label?: string;
	/**
	 * Helper text displayed below the upload area
	 */
	helperText?: string;
	/**
	 * Error text displayed when validation fails
	 */
	errorText?: string;
	/**
	 * Text displayed in the dropzone area
	 */
	dropzoneText?: string;
	/**
	 * Text for the upload trigger button
	 */
	triggerText?: string;
	/**
	 * Whether to show upload progress
	 * @default false
	 */
	showProgress?: boolean;
	/**
	 * Whether to allow drag and drop
	 * @default true
	 */
	allowDrop?: boolean;
	/**
	 * Callback when files are uploaded
	 */
	onUpload?: (files: File[]) => Promise<void>;
	/**
	 * Callback when files are accepted
	 */
	onFileAccept?: (files: File[]) => void;
	/**
	 * Callback when files are rejected
	 */
	onFileReject?: (validation: FileValidationResult) => void;
	/**
	 * Additional CSS class names
	 */
	className?: string;
	/**
	 * Additional styles
	 */
	style?: React.CSSProperties;
	/**
	 * Whether the component is in an error state
	 */
	hasError?: boolean;
}
