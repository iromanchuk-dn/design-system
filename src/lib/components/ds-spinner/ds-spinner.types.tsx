import React from 'react';

export const spinnerSizes = ['small', 'default', 'large'] as const;
export type SpinnerSize = (typeof spinnerSizes)[number];

export interface DsSpinnerProps {
	/**
	 * The size of the spinner
	 * @default 'default'
	 */
	size?: SpinnerSize;
	/**
	 * Additional CSS class names
	 */
	className?: string;
	/**
	 * Additional styles to apply to the component
	 */
	style?: React.CSSProperties;
}
