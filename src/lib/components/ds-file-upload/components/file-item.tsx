import React from 'react';
import classNames from 'classnames';
import { Progress } from '@ark-ui/react';
import { DsIcon } from '../../ds-icon';
import { FileUploadState } from '../hooks/use-file-upload';
import { formatFileSize, getFileTypeIcon } from '../utils/file-validation';
import styles from '../ds-file-upload.module.scss';

export interface FileItemProps {
	fileState: FileUploadState;
	onRemove: (fileId: string) => void;
	showProgress?: boolean;
	className?: string;
}

/**
 * Individual file item component
 */
export const FileItem: React.FC<FileItemProps> = ({
	fileState,
	onRemove,
	showProgress = false,
	className,
}) => {
	const { id, file, progress, status, error } = fileState;

	const handleRemove = () => {
		onRemove(id);
	};

	const getStatusIcon = () => {
		switch (status) {
			case 'completed':
				return 'check_circle';
			case 'error':
				return 'error';
			case 'uploading':
				return 'hourglass_empty';
			default:
				return getFileTypeIcon(file.name);
		}
	};

	const getStatusColor = () => {
		switch (status) {
			case 'completed':
				return 'var(--status-success)';
			case 'error':
				return 'var(--status-error)';
			case 'uploading':
				return 'var(--action-primary)';
			default:
				return 'var(--icon-secondary)';
		}
	};

	const fileItemClass = classNames(
		styles.fileItem,
		{
			[styles.fileItemError]: status === 'error',
			[styles.fileItemCompleted]: status === 'completed',
			[styles.fileItemUploading]: status === 'uploading',
		},
		className,
	);

	return (
		<div className={fileItemClass}>
			<div className={styles.fileItemContent}>
				<div className={styles.filePreview}>
					<DsIcon icon={getStatusIcon()} size="medium" style={{ color: getStatusColor() }} />
				</div>

				<div className={styles.fileInfo}>
					<div className={styles.fileName} title={file.name}>
						{file.name}
					</div>

					{showProgress && status === 'uploading' && (
						<div className={styles.progressContainer}>
							<Progress.Root value={progress} className={styles.progressBar}>
								<Progress.Track className={styles.progressTrack}>
									<Progress.Range className={styles.progressRange} />
								</Progress.Track>
							</Progress.Root>
							<span className={styles.progressText}>Uploading...({Math.round(progress)}%)</span>
						</div>
					)}

					{status === 'completed' && <div className={styles.completedText}>Upload complete</div>}

					{status === 'error' && error && <div className={styles.errorMessage}>{error}</div>}
				</div>

				<button
					className={styles.deleteButton}
					onClick={handleRemove}
					aria-label={`Remove ${file.name}`}
					type="button"
				>
					<DsIcon icon="close" size="small" />
				</button>
			</div>
		</div>
	);
};
