import React from 'react';
import classNames from 'classnames';
import styles from './ds-spinner.module.scss';
import { DsSpinnerProps } from './ds-spinner.types';

/**
 * Design system Spinner component
 */
const DsSpinner: React.FC<DsSpinnerProps> = ({
	size = 'default',
	variant = 'default',
	className,
	style = {},
	children,
	...props
}) => {
	const spinnerClass = classNames(styles.spinner, styles[size], styles[variant], className);

	return (
		<div className={spinnerClass} style={style} {...props}>
			{children}
		</div>
	);
};

export default DsSpinner;
