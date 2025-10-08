import React from 'react';
import classNames from 'classnames';
import { FileUpload, FileUploadFileAcceptDetails } from '@ark-ui/react';
import { DsIcon } from '../ds-icon';
import { Dropzone } from './components/dropzone';
import { FileItem } from './components/file-item';
import { useFileUpload } from './hooks/use-file-upload';
import { validateFiles } from './utils/file-validation';
import styles from './ds-file-upload.module.scss';
import { DsFileUploadProps } from './ds-file-upload.types';

/**
 * Design system FileUpload component
 */
const DsFileUpload: React.FC<DsFileUploadProps> = ({
	label,
	helperText,
	errorText,
	dropzoneText = 'Drag and drop files here or click to browse',
	triggerText = 'Choose files',
	showProgress = false,
	allowDrop = true,
	onUpload,
	onFileAccept,
	onFileReject,
	className,
	style = {},
	hasError = false,
	maxFiles = 5,
	accept = {
		'application/pdf': ['.pdf'],
		'text/csv': ['.csv'],
		'application/zip': ['.zip'],
		'application/x-zip-compressed': ['.zip'],
	},
	disabled = false,
	...props
}) => {
	const { files, addFiles, removeFile, isUploading, hasFiles } = useFileUpload({
		onUpload,
		onFileAccept: (files) => onFileAccept?.(files),
		onFileReject: (validation) => onFileReject?.(validation),
		maxFiles,
	});

	const handleFileAccept = (details: FileUploadFileAcceptDetails) => {
		const acceptedFiles = details?.files || [];
		const validation = validateFiles(acceptedFiles);

		if (!validation.isValid) {
			onFileReject?.(validation);
			return;
		}

		addFiles(acceptedFiles);
		onFileAccept?.(acceptedFiles);
	};

	const rootClass = classNames(
		styles.fileUploadRoot,
		{
			[styles.error]: hasError || errorText,
			[styles.disabled]: disabled,
		},
		className,
	);

	return (
		<div className={rootClass} style={style}>
			<FileUpload.Root
				maxFiles={maxFiles}
				accept={accept}
				disabled={disabled}
				allowDrop={allowDrop}
				onFileAccept={handleFileAccept}
				{...props}
			>
				<Dropzone
					label={label}
					dropzoneText={dropzoneText}
					triggerText={triggerText}
					disabled={disabled}
					hasError={hasError || !!errorText}
				/>

				{hasFiles && (
					<div className={styles.fileList}>
						{files.map((fileState) => (
							<FileItem
								key={fileState.id}
								fileState={fileState}
								onRemove={removeFile}
								showProgress={showProgress}
							/>
						))}
					</div>
				)}

				<FileUpload.HiddenInput />
			</FileUpload.Root>

			{helperText && !errorText && <div className={styles.helperText}>{helperText}</div>}
			{errorText && (
				<div className={styles.errorText}>
					<DsIcon icon="error" size="tiny" />
					{errorText}
				</div>
			)}
		</div>
	);
};

export default DsFileUpload;
