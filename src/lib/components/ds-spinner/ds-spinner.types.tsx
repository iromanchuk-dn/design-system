import React, { ReactNode } from 'react';

export interface DsSpinnerProps {
	/**
	 * The size of the spinner
	 * @default 'default'
	 */
	size?: 'small' | 'default' | 'large';
	/**
	 * The variant of the spinner
	 * @default 'default'
	 */
	variant?: 'default' | 'overlay';
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
