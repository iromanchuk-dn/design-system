import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, waitFor, within } from '@storybook/test';
import DsFileUpload from './ds-file-upload';

const meta: Meta<typeof DsFileUpload> = {
	title: 'Design System/FileUpload',
	component: DsFileUpload,
	parameters: {
		layout: 'padded',
		docs: {
			description: {
				component: `
A comprehensive file upload component built with ARK UI that supports:
- Drag and drop functionality
- Multiple file selection (up to 5 files)
- File type validation (PDF, CSV, ZIP only)
- File size limits (25MB max)
- Upload progress indication
- Clean, modular architecture

**File Restrictions:**
- Only PDF, CSV, and ZIP files are allowed
- Maximum file size: 25MB
- Maximum files: 5
        `,
			},
		},
	},
	tags: ['autodocs'],
	argTypes: {
		label: {
			control: 'text',
			description: 'Label text for the file upload',
		},
		helperText: {
			control: 'text',
			description: 'Helper text displayed below the upload area',
		},
		errorText: {
			control: 'text',
			description: 'Error text displayed when validation fails',
		},
		dropzoneText: {
			control: 'text',
			description: 'Text displayed in the dropzone area',
		},
		triggerText: {
			control: 'text',
			description: 'Text for the upload trigger button',
		},
		maxFiles: {
			control: 'number',
			description: 'Maximum number of files allowed',
		},
		showProgress: {
			control: 'boolean',
			description: 'Whether to show upload progress',
		},
		allowDrop: {
			control: 'boolean',
			description: 'Whether to allow drag and drop',
		},
		disabled: {
			control: 'boolean',
			description: 'Whether the component is disabled',
		},
		hasError: {
			control: 'boolean',
			description: 'Whether the component is in an error state',
		},
		className: {
			control: 'text',
			description: 'Additional CSS class names',
		},
		onUpload: {
			action: 'uploaded',
			description: 'Callback when files are uploaded',
		},
		onFileAccept: {
			action: 'fileAccepted',
			description: 'Callback when files are accepted',
		},
		onFileReject: {
			action: 'fileRejected',
			description: 'Callback when files are rejected',
		},
	},
};

export default meta;
type Story = StoryObj<typeof DsFileUpload>;

export const Default: Story = {
	args: {
		label: 'Upload Files',
		helperText: 'Only PDF, CSV, and ZIP files. File size 25MB max.',
		maxFiles: 5,
		onUpload: (lala) => console.log('onUplaod', lala),
	},
};

export const WithProgress: Story = {
	args: {
		label: 'Upload Documents',
		helperText: 'PDF, CSV, ZIP files up to 25MB',
		dropzoneText: 'Drag and drop documents here',
		triggerText: 'Select documents',
		showProgress: true,
		onUpload: async (files) => {
			// Simulate S3 upload process
			for (const file of files) {
				console.log(`📤 Starting upload for ${file.name}...`);

				// Simulate getting signed URL (1-2 seconds)
				await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 1000));
				console.log(`🔑 Got signed URL for ${file.name}`);

				// Simulate upload progress
				const uploadDuration = 2000 + Math.random() * 3000; // 2-5 seconds
				const steps = 20;
				const stepDuration = uploadDuration / steps;

				for (let i = 0; i <= steps; i++) {
					await new Promise((resolve) => setTimeout(resolve, stepDuration));
					const progress = Math.min((i / steps) * 100, 100);
					console.log(`📊 Upload progress for ${file.name}: ${Math.round(progress)}%`);
				}

				// Simulate occasional failures (10% chance)
				if (Math.random() < 0.1) {
					console.log(`❌ Upload failed for ${file.name}: Network timeout`);
					throw new Error('Network timeout');
				} else {
					console.log(`✅ Upload completed for ${file.name}`);
				}
			}
		},
	},
};

export const SingleFile: Story = {
	args: {
		label: 'Upload Document',
		helperText: 'Choose a single document file',
		maxFiles: 1,
		dropzoneText: 'Drop your document here',
		triggerText: 'Choose document',
	},
};

export const WithError: Story = {
	args: {
		label: 'Upload Files',
		errorText: 'File size exceeds the maximum limit of 25MB',
		hasError: true,
	},
};

export const Disabled: Story = {
	args: {
		label: 'Upload Files',
		helperText: 'File upload is currently disabled',
		disabled: true,
	},
};

export const NoDropzone: Story = {
	args: {
		label: 'Upload Files (Click only)',
		helperText: 'Drag and drop is disabled, click to select files',
		allowDrop: false,
		dropzoneText: 'Click to select files',
	},
};

export const WithValidation: Story = {
	args: {
		label: 'Upload with Validation',
		helperText: 'Only specific file types and sizes are allowed',
		maxFiles: 3,
		onFileReject: (validation) => {
			console.log('Files rejected:', validation);
		},
	},
};

// Realistic S3 upload simulation
export const S3UploadSimulation: Story = {
	args: {
		label: 'S3 Upload Simulation',
		helperText: 'This simulates a real S3 upload with signed URLs',
		showProgress: true,
		onUpload: async (files) => {
			// Simulate realistic S3 upload process
			for (const file of files) {
				try {
					// Step 1: Get signed URL from backend (simulate API call)
					console.log(`📤 Getting signed URL for ${file.name}...`);
					await new Promise((resolve) => setTimeout(resolve, 800 + Math.random() * 1200)); // 0.8-2s
					console.log(`🔑 Got signed URL for ${file.name}`);

					// Step 2: Start upload to S3
					console.log(`🚀 Starting upload for ${file.name}...`);

					// Simulate realistic upload progress based on file size
					const fileSize = file.size;
					const uploadSpeed = 50_000 + Math.random() * 100_000; // 50-150 KB/s
					const totalTime = (fileSize / uploadSpeed) * 1000; // Convert to ms
					const steps = Math.min(30, Math.max(10, Math.floor(totalTime / 200))); // 10-30 steps
					const stepDuration = totalTime / steps;

					for (let i = 0; i <= steps; i++) {
						await new Promise((resolve) => setTimeout(resolve, stepDuration));
						const progress = Math.min((i / steps) * 100, 100);
						console.log(`📊 Upload progress for ${file.name}: ${Math.round(progress)}%`);

						// Simulate network hiccups (slower progress occasionally)
						if (Math.random() < 0.1) {
							await new Promise((resolve) => setTimeout(resolve, 500));
						}
					}

					// Step 3: Verify upload completion
					await new Promise((resolve) => setTimeout(resolve, 200 + Math.random() * 300));

					// Simulate occasional failures (5% chance)
					if (Math.random() < 0.05) {
						console.log(`❌ Upload failed for ${file.name}: S3 upload failed - network timeout`);
						throw new Error('S3 upload failed - network timeout');
					} else {
						console.log(`✅ Upload completed for ${file.name}`);
					}
				} catch (error) {
					console.log(`❌ Backend error for ${file.name}:`, error);
					throw error;
				}
			}
		},
	},
};

// Interactive story with play function
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
