import React from 'react';
import classNames from 'classnames';
import styles from './ds-status-badge.module.scss';
import { DsStatusBadgeProps } from './ds-status-badge.types';
import { DsIcon } from '../ds-icon';
import { DsTypography } from '../ds-typography';

/**
 * Design system StatusBadge component
 */
const DsStatusBadge: React.FC<DsStatusBadgeProps> = ({
	icon,
	status,
	label,
	className,
	style,
	filled = true,
	compact,
}) => {
	return (
		<div
			style={style}
			className={classNames(
				styles.container,
				styles[status],
				filled && styles.filled,
				compact && styles.compact,
				className,
			)}
		>
			<DsIcon icon={icon} size="tiny" filled />
			<DsTypography className={styles.label} variant={filled ? 'body-xs-reg' : 'body-xs-md'}>
				{label || status}
			</DsTypography>
		</div>
	);
};

export default DsStatusBadge;
