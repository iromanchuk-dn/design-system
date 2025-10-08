import React from 'react';
import classNames from 'classnames';
import { FileUpload } from '@ark-ui/react';
import { DsIcon } from '../../ds-icon';
import { DsButton } from '../../ds-button';
import styles from '../ds-file-upload.module.scss';

export interface DropzoneProps {
	label?: string;
	dropzoneText?: string;
	triggerText?: string;
	disabled?: boolean;
	hasError?: boolean;
	className?: string;
}

/**
 * Dropzone component for file upload
 */
export const Dropzone: React.FC<DropzoneProps> = ({
	label,
	dropzoneText = 'Drag and drop files here or click to browse',
	triggerText = 'Choose files',
	disabled = false,
	hasError = false,
	className,
}) => {
	const dropzoneClass = classNames(
		styles.dropzone,
		{
			[styles.dropzoneError]: hasError,
			[styles.dropzoneDisabled]: disabled,
		},
		className,
	);

	return (
		<>
			{label && <FileUpload.Label className={styles.label}>{label}</FileUpload.Label>}

			<FileUpload.Dropzone className={dropzoneClass}>
				<DsIcon icon="cloud_upload" size="large" className={styles.dropzoneIcon} />
				<div className={styles.dropzoneText}>{dropzoneText}</div>
				<FileUpload.Trigger asChild>
					<DsButton design="v1.2" variant="ghost" size="small" disabled={disabled}>
						<DsIcon icon="upload_file" size="small" />
						{triggerText}
					</DsButton>
				</FileUpload.Trigger>
			</FileUpload.Dropzone>
		</>
	);
};
