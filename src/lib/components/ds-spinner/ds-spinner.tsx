import React from 'react';
import classNames from 'classnames';
import styles from './ds-spinner.module.scss';
import { DsSpinnerProps } from './ds-spinner.types';

const sizeMap = {
	small: 50,
	default: 75,
	large: 100,
};

const widthMap = {
	small: 4,
	default: 7,
	large: 9,
};

/**
 * Design system Spinner component
 */
const DsSpinner: React.FC<DsSpinnerProps> = ({ size = 'default', className, style = {}, ...props }) => {
	const progress = 25;
	const actualSize = sizeMap[size];
	const actualWidth = widthMap[size];
	const radius = (actualSize - actualWidth) / 2;
	const circumference = 2 * Math.PI * radius;
	const strokeDashoffset = 2 * (progress / 100) * circumference;
	const strokeDasharray = `${(progress / 100) * circumference} ${circumference}`;

	return (
		<div className={classNames(styles.spinnerContainer, styles[size], className)} style={style} {...props}>
			<svg
				className={classNames(styles.progressCircle, styles.spin)}
				width={actualSize}
				height={actualSize}
				viewBox={`0 0 ${actualSize} ${actualSize}`}
			>
				<circle
					cx={actualSize / 2}
					cy={actualSize / 2}
					r={radius}
					fill="none"
					strokeWidth={actualWidth}
					strokeDasharray={strokeDasharray}
					strokeDashoffset={strokeDashoffset}
					strokeLinecap="round"
					className={styles.progressArc}
				/>
			</svg>
		</div>
	);
};

export default DsSpinner;
