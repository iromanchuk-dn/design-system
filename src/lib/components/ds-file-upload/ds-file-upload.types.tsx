import React from 'react';
import {
	FileUploadFileAcceptDetails,
	FileUploadFileError,
	FileUploadFileRejectDetails,
	FileUploadRootProps,
} from '@ark-ui/react';
import { UploadFileMeta } from './hooks/use-file-upload';

export type FileError = FileUploadFileError;

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
	 * Maximum file size in bytes
	 * @default 25MB
	 */
	maxFileSize?: number;
	/**
	 * Callback when files are accepted
	 */
	onFileAccept?: (details: FileUploadFileAcceptDetails) => void;
	/**
	 * Callback when files are rejected
	 */
	onFileReject?: (details: FileUploadFileRejectDetails) => void;
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
	/**
	 * File states to display (managed externally)
	 */
	files?: UploadFileMeta[];
	/**
	 * Callback to remove a file
	 */
	onRemove?: (fileId: string) => void;
	/**
	 * Controlled accepted files
	 */
	acceptedFiles?: File[];
}
