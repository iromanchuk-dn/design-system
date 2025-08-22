import React from 'react';
import classNames from 'classnames';
import styles from './ds-spinner.module.scss';
import { DsSpinnerProps } from './ds-spinner.types';

/**
 * Design system Spinner component
 */
const DsSpinner: React.FC<DsSpinnerProps> = ({
	size = 100,
	width = 9,
	progress = 25,
	color = 'var(--color-background-selected)',
	outlineColor,
	speed = 2,
	className,
	style = {},
	children,
	...props
}) => {
	const radius = (size - width) / 2;
	const circumference = 2 * Math.PI * radius;
	const strokeDasharray = `${(progress / 100) * circumference} ${circumference}`;

	return (
		<div className={classNames(styles.spinnerContainer, className)} style={style} {...props}>
			<div
				className={styles.spinnerWrapper}
				style={{
					width: size,
					height: size,
				}}
			>
				{/* Background circle (optional outline) */}
				{outlineColor && (
					<svg className={styles.backgroundCircle} width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
						<circle
							cx={size / 2}
							cy={size / 2}
							r={radius}
							fill="none"
							stroke={outlineColor}
							strokeWidth="2"
							opacity="0.3"
						/>
					</svg>
				)}

				{/* Animated progress circle */}
				<svg
					className={classNames(styles.progressCircle, styles.spin)}
					width={size}
					height={size}
					viewBox={`0 0 ${size} ${size}`}
					style={{
						animationDuration: `${speed}s`,
					}}
				>
					<circle
						cx={size / 2}
						cy={size / 2}
						r={radius}
						fill="none"
						stroke={color}
						strokeWidth={width}
						strokeDasharray={strokeDasharray}
						strokeLinecap="round"
						className={styles.progressArc}
					/>
				</svg>
			</div>
			{children}
		</div>
	);
};

export default DsSpinner;
