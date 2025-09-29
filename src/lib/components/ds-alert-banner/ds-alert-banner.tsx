import React from 'react';
import classNames from 'classnames';
import styles from './ds-alert-banner.module.scss';
import { DsAlertBannerProps } from './ds-alert-banner.types';
import { DsIcon } from '../ds-icon';
import { DsTypography } from '../ds-typography';

/**
 * Design system AlertBanner component
 * Controlled component that displays alert messages with different variants
 */
const DsAlertBanner: React.FC<DsAlertBannerProps> = ({
	open,
	onOpenChange,
	inline = false,
	variant,
	icon,
	title,
	description,
	closable = false,
	className,
	style = {},
	children,
}) => {
	const variantClass = {
		'info-neutral': styles.infoNeutral,
		'info-blue': styles.infoBlue,
		warning: styles.warning,
		error: styles.error,
		success: styles.success,
	}[variant];

	const alertBannerClass = classNames(
		styles.alertBanner,
		inline && styles.inline,
		!inline && styles.global,
		variantClass,
		{
			[styles.hidden]: !open,
		},
		className,
	);

	const handleClose = () => {
		onOpenChange(false);
	};

	if (!open) {
		return null;
	}

	return (
		<div className={alertBannerClass} style={style}>
			{icon && <DsIcon className={styles.icon} icon={icon} size="small" filled />}
			{title && (
				<DsTypography className={styles.title} variant="body-md-md">
					{title}
				</DsTypography>
			)}
			{description && (
				<DsTypography className={styles.description} variant="body-sm-reg">
					{description}
				</DsTypography>
			)}
			{children && <div className={styles.actions}>{children}</div>}

			{closable && (
				<button className={styles.closeButton} onClick={handleClose} aria-label="Close alert">
					<DsIcon icon="close" size="small" />
				</button>
			)}
		</div>
	);
};

export default DsAlertBanner;
