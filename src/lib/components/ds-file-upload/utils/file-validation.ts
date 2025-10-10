import { IconType } from '../../ds-icon';
import { FileError } from '../ds-file-upload.types';
import { FileMeta } from '../hooks/use-file-upload';

/**
 * Default allowed file types for the file upload component
 */
export const DEFAULT_ALLOWED_FILE_TYPES: Record<string, string[]> = {
	'application/pdf': ['.pdf'],
	'text/csv': ['.csv'],
	'application/zip': ['.zip'],
	'application/x-zip-compressed': ['.zip'],
} as const;

/**
 * Default maximum file size in bytes (25MB)
 */
export const DEFAULT_MAX_FILE_SIZE = 25 * 1024 * 1024; // 25MB

/**
 * Default maximum number of files allowed
 */
export const DEFAULT_MAX_FILES = 5;

/**
 * Format file size to human-readable format
 */
export function formatFileSize(bytes: number): string {
	if (bytes === 0) return '0 B';
	const k = 1024;
	const sizes = ['B', 'KB', 'MB', 'GB'];
	const i = Math.floor(Math.log(bytes) / Math.log(k));
	return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}

/**
 * Get file type icon based on file extension
 */
export function getFileTypeIcon(fileName: string): IconType {
	const extension = fileName.toLowerCase().split('.').pop();

	switch (extension) {
		case 'pdf':
			return 'picture_as_pdf';
		case 'csv':
			return 'table_chart';
		case 'zip':
			return 'folder_zip';
		default:
			return 'insert_drive_file';
	}
}

export function isFileEqual(file1: FileMeta, file2: FileMeta): boolean {
	return file1.name === file2.name && file1.size === file2.size && file1.type === file2.type;
}

/**
 * Map Ark UI FileUploadFileError to user-friendly error message
 */
export function getErrorMessage(error: FileError): string {
	switch (error) {
		case 'FILE_TOO_LARGE':
			return `File size exceeds the maximum limit`;
		case 'FILE_INVALID_TYPE':
			return `File type is not allowed`;
		case 'TOO_MANY_FILES':
			return `Too many files selected`;
		case 'FILE_TOO_SMALL':
			return `File size is too small`;
		case 'FILE_INVALID':
			return `File is invalid`;
		case 'FILE_EXISTS':
			return `File already exists`;
		default:
			return 'File validation failed';
	}
}
