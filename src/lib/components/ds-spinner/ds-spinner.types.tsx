import React, { ReactNode } from 'react';

export interface DsSpinnerProps {
	/**
	 * The size of the spinner in pixels
	 * @default 100
	 */
	size?: number;
	/**
	 * The thickness of the progress arc
	 * @default 9
	 */
	width?: number;
	/**
	 * Progress percentage (0-100). If not provided, shows a continuous spinning animation
	 */
	progress?: number;
	/**
	 * Color of the progress arc
	 * @default 'var(--color-background-selected)'
	 */
	color?: string;
	/**
	 * Color of the background outline (optional)
	 */
	outlineColor?: string;
	/**
	 * Rotation speed in seconds
	 * @default 2
	 */
	speed?: number;
	/**
	 * Additional CSS class names
	 */
	className?: string;
	/**
	 * Additional styles to apply to the component
	 */
	style?: React.CSSProperties;
	/**
	 * Optional children to be rendered inside the component
	 */
	children?: ReactNode | undefined;
}
