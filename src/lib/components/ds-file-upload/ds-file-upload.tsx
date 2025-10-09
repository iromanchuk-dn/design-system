import React from 'react';
import classNames from 'classnames';
import { FileUpload } from '@ark-ui/react';
import { DsIcon } from '../ds-icon';
import { Dropzone } from './components/dropzone';
import { FileItem } from './components/file-item';
import styles from './ds-file-upload.module.scss';
import { DsFileUploadProps } from './ds-file-upload.types';
import {
	DEFAULT_ALLOWED_FILE_TYPES,
	DEFAULT_MAX_FILE_SIZE,
	DEFAULT_MAX_FILES,
} from './utils/file-validation';

/**
 * Clean file upload component - minimal UI only
 * User handles all upload logic externally
 */
const DsFileUpload: React.FC<DsFileUploadProps> = ({
	label,
	helperText,
	errorText,
	dropzoneText = 'Drag and drop files here or click to browse',
	triggerText = 'Choose files',
	showProgress = false,
	allowDrop = true,
	onFileAccept,
	onFileReject,
	className,
	style = {},
	hasError = false,
	accept = DEFAULT_ALLOWED_FILE_TYPES,
	maxFiles = DEFAULT_MAX_FILES,
	maxFileSize = DEFAULT_MAX_FILE_SIZE,
	disabled = false,
	...props
}) => {
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
				maxFileSize={maxFileSize}
				accept={accept}
				disabled={disabled}
				allowDrop={allowDrop}
				onFileAccept={onFileAccept}
				onFileReject={onFileReject}
				{...props}
			>
				<Dropzone
					label={label}
					dropzoneText={dropzoneText}
					triggerText={triggerText}
					disabled={disabled}
					hasError={hasError || !!errorText}
				/>

				{props.files && props.files.length > 0 && (
					<div className={styles.fileList}>
						{props.files.map((fileState) => (
							<FileItem
								key={fileState.id}
								fileState={fileState}
								onRemove={props.onRemove || (() => {})}
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
