import type { Meta, StoryObj } from '@storybook/react';
import { FileUploadFileAcceptDetails, FileUploadFileRejectDetails } from '@ark-ui/react';
import { expect, userEvent, waitFor, within } from '@storybook/test';
import DsFileUpload from './ds-file-upload';
import { useFileUpload } from './hooks/use-file-upload';

const meta: Meta<typeof DsFileUpload> = {
	title: 'Design System/FileUpload',
	component: DsFileUpload,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		errorText: { control: 'text' },
		dropzoneText: { control: 'text' },
		triggerText: { control: 'text' },
		showProgress: { control: 'boolean' },
		allowDrop: { control: 'boolean' },
		maxFiles: { control: 'number' },
		accept: { control: 'object' },
		disabled: { control: 'boolean' },
		hasError: { control: 'boolean' },
		onFileAccept: { action: 'fileAccepted' },
		onFileReject: { action: 'fileRejected' },
	},
};

export default meta;
type Story = StoryObj<typeof DsFileUpload>;

export const Default: Story = {
	args: {
		showProgress: true,
	},
	render: function Render(args) {
		const {
			files,
			acceptedFiles,
			addFiles,
			addRejectedFiles,
			removeFile,
			updateFileProgress,
			updateFileStatus,
		} = useFileUpload();

		const uploadToS3 = async (file: File, onProgress: (progress: number) => void) => {
			// Simulate S3 upload with progress
			// const uploadDuration = 2000 + Math.random() * 3000;
			const uploadDuration = 20000 + Math.random() * 3000;
			// const uploadDuration = 200000 + Math.random() * 3000;
			const steps = 20;
			const stepDuration = uploadDuration / steps;

			for (let i = 0; i <= steps; i++) {
				await new Promise((resolve) => setTimeout(resolve, stepDuration));
				const progress = Math.min((i / steps) * 100, 100);
				onProgress(progress);
			}
		};

		const handleFileAccept = async (details: FileUploadFileAcceptDetails) => {
			try {
				// Add files to state and get the file states back
				const uploadFiles = addFiles(details.files);

				// Start upload immediately for each new file - all simultaneously
				const uploadPromises = uploadFiles.map(async (uploadFile) => {
					try {
						updateFileStatus(uploadFile.id, 'uploading');

						await uploadToS3(uploadFile, (progress) => {
							updateFileProgress(uploadFile.id, progress);
						});

						updateFileStatus(uploadFile.id, 'completed');
					} catch (error) {
						const errorMessage = error instanceof Error ? error.message : 'unknown error';
						updateFileStatus(uploadFile.id, 'error', `Upload failed: ${errorMessage}`);
					}
				});

				// Wait for all uploads to complete (or fail)
				await Promise.all(uploadPromises);
			} catch (error) {
				console.error('File validation failed:', error);
			}
		};

		const handleFileReject = (details: FileUploadFileRejectDetails) => {
			addRejectedFiles(details.files);
		};

		return (
			<div>
				<DsFileUpload
					{...args}
					files={files}
					acceptedFiles={acceptedFiles}
					onFileAccept={handleFileAccept}
					onFileReject={handleFileReject}
					onFileRemove={removeFile}
				/>
			</div>
		);
	},
};

export const Manual: Story = {
	args: {
		showProgress: true,
	},
	render: function Render(args) {
		const {
			files,
			acceptedFiles,
			addFiles,
			addRejectedFiles,
			removeFile,
			updateFileProgress,
			updateFileStatus,
		} = useFileUpload();

		const handleFileAccept = (details: FileUploadFileAcceptDetails) => {
			try {
				addFiles(details.files);
			} catch (error) {
				console.error('File validation failed:', error);
			}
		};

		const handleFileReject = (details: FileUploadFileRejectDetails) => {
			addRejectedFiles(details.files);
		};

		const uploadToS3 = async (file: File, onProgress: (progress: number) => void) => {
			// Simulate S3 upload with progress
			const uploadDuration = 2000 + Math.random() * 3000;
			const steps = 20;
			const stepDuration = uploadDuration / steps;

			for (let i = 0; i <= steps; i++) {
				await new Promise((resolve) => setTimeout(resolve, stepDuration));
				const progress = Math.min((i / steps) * 100, 100);
				onProgress(progress);
			}
		};

		const handleS3Upload = async () => {
			// User's S3 upload logic
			for (const fileState of acceptedFiles) {
				try {
					updateFileStatus(fileState.id, 'uploading');

					await uploadToS3(fileState, (progress) => {
						updateFileProgress(fileState.id, progress);
					});

					updateFileStatus(fileState.id, 'completed');
				} catch (error) {
					const errorMessage = error instanceof Error ? error.message : 'unknown error';
					updateFileStatus(fileState.id, 'error', `Upload failed: ${errorMessage}`);
				}
			}
		};

		return (
			<div>
				<DsFileUpload
					{...args}
					files={files}
					acceptedFiles={acceptedFiles}
					onFileAccept={handleFileAccept}
					onFileReject={handleFileReject}
					onFileRemove={removeFile}
				/>
				{files.length > 0 && (
					<div style={{ marginTop: '16px' }}>
						<button onClick={handleS3Upload}>Upload to S3</button>
					</div>
				)}
			</div>
		);
	},
};

export const Compact: Story = {
	args: {
		style: { width: '500px' },
		compact: true,
		maxFiles: 1,
		dropzoneText: 'Drag and drop your document here or',
		triggerText: 'Choose document',
	},
};

export const Disabled: Story = {
	args: {
		disabled: true,
		style: { width: '300px' },
	},
};

export const UploadInterrupted: Story = {
	args: {
		showProgress: true,
	},
	render: function Render(args) {
		const {
			files,
			acceptedFiles,
			addFiles,
			addRejectedFiles,
			removeFile,
			updateFileProgress,
			updateFileStatus,
		} = useFileUpload();

		const uploadToS3 = async (
			file: File,
			onProgress: (progress: number) => void,
			shouldInterrupt = false,
		) => {
			const uploadDuration = 2000; // Fast for testing
			const steps = 10;
			const stepDuration = uploadDuration / steps;

			for (let i = 0; i <= steps; i++) {
				await new Promise((resolve) => setTimeout(resolve, stepDuration));
				const progress = Math.min((i / steps) * 100, 100);
				onProgress(progress);

				// Interrupt upload at 30% progress
				if (shouldInterrupt && progress >= 30) {
					throw new Error('Network connection lost');
				}
			}
		};

		const handleFileAccept = async (details: FileUploadFileAcceptDetails) => {
			const uploadFiles = addFiles(details.files);
			const uploadPromises = uploadFiles.map(async (uploadFile) => {
				try {
					updateFileStatus(uploadFile.id, 'uploading');
					await uploadToS3(
						uploadFile,
						(progress) => {
							updateFileProgress(uploadFile.id, progress);
						},
						true,
					);
					updateFileStatus(uploadFile.id, 'completed');
				} catch (error) {
					const errorMessage = error instanceof Error ? error.message : 'unknown error';
					updateFileStatus(uploadFile.id, 'interrupted', `Upload interrupted: ${errorMessage}`);
				}
			});
			await Promise.all(uploadPromises);
		};

		const handleFileReject = (details: FileUploadFileRejectDetails) => {
			addRejectedFiles(details.files);
		};

		const handleFileRetry = async (fileId: string) => {
			const fileToRetry = files.find((f) => f.id === fileId);
			if (!fileToRetry) return;

			try {
				updateFileStatus(fileId, 'uploading');
				updateFileProgress(fileId, 0);
				await uploadToS3(
					fileToRetry as any,
					(progress) => {
						updateFileProgress(fileId, progress);
					},
					false,
				);
				updateFileStatus(fileId, 'completed');
			} catch (error) {
				const errorMessage = error instanceof Error ? error.message : 'unknown error';
				updateFileStatus(fileId, 'error', `Upload failed: ${errorMessage}`);
			}
		};

		return (
			<DsFileUpload
				{...args}
				files={files}
				acceptedFiles={acceptedFiles}
				onFileAccept={handleFileAccept}
				onFileReject={handleFileReject}
				onFileRetry={handleFileRetry}
				onFileDelete={removeFile}
			/>
		);
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);

		const mockFile = new File(['test content'], 'test-file.pdf', { type: 'application/pdf' });
		const fileInput = canvasElement.querySelector('input[type="file"]') as HTMLInputElement;
		await userEvent.upload(fileInput, mockFile);
		/*
				// Wait for the callback to be called
				await waitFor(() => {
					expect(args.onFileAccept).toHaveBeenCalled();
				});
		*/
		// Wait for upload to start and show progress
		await waitFor(
			() => {
				expect(canvas.getByText(/Uploading/)).toBeInTheDocument();
			},
			{ timeout: 3000 },
		);

		// Wait for upload to be interrupted
		await waitFor(
			() => {
				expect(canvas.getByText('Upload interrupted')).toBeInTheDocument();
			},
			{ timeout: 5000 },
		);

		// Test retry button
		const retryButton = canvas.getByLabelText(/Retry.*upload/);
		await userEvent.click(retryButton);

		// Wait for retry to complete
		await waitFor(
			() => {
				expect(canvas.getByText('Upload complete')).toBeInTheDocument();
			},
			{ timeout: 5000 },
		);

		// Test retry button
		const deleteButton = canvas.getByLabelText(/Delete.*/);
		await userEvent.click(deleteButton);
	},
};
/*
export const NoDropzone: Story = {
	args: {
		label: 'Upload Files (Click only)',
		helperText: 'Drag and drop is disabled, click to select files',
		allowDrop: false,
		dropzoneText: 'Click to select files',
	},
};
*/
/*
export const Interactive: Story = {
	args: {
		label: 'Interactive Upload',
		helperText: 'Try uploading files',
		maxFiles: 3,
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);

		// Wait for the component to be rendered
		await waitFor(() => {
			expect(canvas.getByText('Interactive Upload')).toBeInTheDocument();
		});

		// Find and click the trigger button
		const trigger = canvas.getByRole('button', { name: /choose files/i });
		await userEvent.click(trigger);

		// Verify the hidden input exists (file selection would happen here in real usage)
		const hiddenInput = canvasElement.querySelector('input[type="file"]');
		expect(hiddenInput).toBeInTheDocument();
	},
};
*/
