import { useCallback, useState } from 'react';
import { FileError } from '../ds-file-upload.types';

export interface FileWithErrors {
	file: File;
	errors: FileError[];
}

export interface FileUploadState {
	id: string;
	file: File;
	progress: number;
	status: 'pending' | 'uploading' | 'completed' | 'error';
	errors?: FileError[];
}

export interface UseFileUploadReturn {
	files: FileUploadState[];
	addFiles: (newFiles: File[]) => FileUploadState[];
	addRejectedFiles: (files: FileWithErrors[]) => FileUploadState[];
	removeFile: (fileId: string) => void;
	updateFileProgress: (fileId: string, progress: number) => void;
	updateFileStatus: (fileId: string, status: FileUploadState['status'], error?: string) => void;
	clearFiles: () => void;
	isUploading: boolean;
	hasFiles: boolean;
}

/**
 * Simple file state management hook
 * No upload logic - just file state
 * Validation is handled by Ark UI
 */
export function useFileUpload(): UseFileUploadReturn {
	const [files, setFiles] = useState<FileUploadState[]>([]);

	const addFiles = useCallback((newFiles: File[]): FileUploadState[] => {
		const newFileStates: FileUploadState[] = newFiles.map((file) => ({
			id: `${file.name}-${Date.now()}-${Math.random()}`,
			file,
			progress: 0,
			status: 'pending',
		}));

		setFiles((prev) => [...prev, ...newFileStates]);
		return newFileStates;
	}, []);

	const addRejectedFiles = useCallback((filesWithErrors: FileWithErrors[]): FileUploadState[] => {
		const newFileStates: FileUploadState[] = filesWithErrors.map(({ file, errors }) => ({
			id: `${file.name}-${Date.now()}-${Math.random()}`,
			file,
			progress: 0,
			status: 'error',
			errors,
		}));

		setFiles((prev) => [...prev, ...newFileStates]);
		return newFileStates;
	}, []);

	const removeFile = useCallback((fileId: string) => {
		setFiles((prev) => prev.filter((file) => file.id !== fileId));
	}, []);

	const updateFileProgress = useCallback((fileId: string, progress: number) => {
		setFiles((prev) => prev.map((file) => (file.id === fileId ? { ...file, progress } : file)));
	}, []);

	const updateFileStatus = useCallback(
		(fileId: string, status: FileUploadState['status'], error?: string) => {
			setFiles((prev) => prev.map((file) => (file.id === fileId ? { ...file, status, error } : file)));
		},
		[],
	);

	const clearFiles = useCallback(() => {
		setFiles([]);
	}, []);

	const isUploading = files.some((file) => file.status === 'uploading');
	const hasFiles = files.length > 0;

	return {
		files,
		addFiles,
		addRejectedFiles,
		removeFile,
		updateFileProgress,
		updateFileStatus,
		clearFiles,
		isUploading,
		hasFiles,
	};
}
