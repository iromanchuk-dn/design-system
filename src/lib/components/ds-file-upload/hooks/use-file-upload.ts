import { useState, useCallback } from 'react';
import { validateFiles, FileValidationResult } from '../utils/file-validation';

export interface FileUploadState {
	id: string;
	file: File;
	progress: number;
	status: 'pending' | 'uploading' | 'completed' | 'error';
	error?: string;
}

export interface UseFileUploadOptions {
	onUpload?: (files: File[]) => Promise<void>;
	onFileAccept?: (files: File[]) => void;
	onFileReject?: (validation: FileValidationResult) => void;
	maxFiles?: number;
}

export interface UseFileUploadReturn {
	files: FileUploadState[];
	addFiles: (newFiles: File[]) => void;
	removeFile: (fileId: string) => void;
	updateFileProgress: (fileId: string, progress: number) => void;
	updateFileStatus: (fileId: string, status: FileUploadState['status'], error?: string) => void;
	clearFiles: () => void;
	isUploading: boolean;
	hasFiles: boolean;
}

/**
 * Custom hook for managing file upload state and logic
 */
export function useFileUpload({
	onUpload,
	onFileAccept,
	onFileReject,
	maxFiles = 5,
}: UseFileUploadOptions = {}): UseFileUploadReturn {
	const [files, setFiles] = useState<FileUploadState[]>([]);

	const addFiles = useCallback(
		(newFiles: File[]) => {
			// Validate files
			const validation = validateFiles(newFiles);

			if (!validation.isValid) {
				onFileReject?.(validation);
				return;
			}

			// Create file states
			const newFileStates: FileUploadState[] = newFiles.map((file) => ({
				id: `${file.name}-${Date.now()}-${Math.random()}`,
				file,
				progress: 0,
				status: 'pending',
			}));

			setFiles((prev) => {
				const updated = [...prev, ...newFileStates];
				// Limit to maxFiles
				return updated.slice(-maxFiles);
			});

			onFileAccept?.(newFiles);

			// Start upload if onUpload is provided
			if (onUpload) {
				handleUpload(newFileStates);
			}
		},
		[onUpload, onFileAccept, onFileReject, maxFiles],
	);

	const handleUpload = async (fileStates: FileUploadState[]) => {
		// Update status to uploading
		setFiles((prev) =>
			prev.map((file) =>
				fileStates.some((fs) => fs.id === file.id) ? { ...file, status: 'uploading' as const } : file,
			),
		);

		try {
			const filesToUpload = fileStates.map((fs) => fs.file);
			await onUpload?.(filesToUpload);

			// Update status to completed
			setFiles((prev) =>
				prev.map((file) =>
					fileStates.some((fs) => fs.id === file.id)
						? { ...file, status: 'completed' as const, progress: 100 }
						: file,
				),
			);
		} catch (error) {
			// Update status to error
			setFiles((prev) =>
				prev.map((file) =>
					fileStates.some((fs) => fs.id === file.id)
						? {
								...file,
								status: 'error' as const,
								error: error instanceof Error ? error.message : 'Upload failed',
							}
						: file,
				),
			);
		}
	};

	const removeFile = useCallback((fileId: string) => {
		setFiles((prev) => prev.filter((file) => file.id !== fileId));
	}, []);

	const updateFileProgress = useCallback((fileId: string, progress: number) => {
		setFiles((prev) =>
			prev.map((file) =>
				file.id === fileId ? { ...file, progress: Math.max(0, Math.min(100, progress)) } : file,
			),
		);
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
		removeFile,
		updateFileProgress,
		updateFileStatus,
		clearFiles,
		isUploading,
		hasFiles,
	};
}
