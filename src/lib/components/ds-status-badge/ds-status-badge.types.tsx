import { CSSProperties } from 'react';
import { IconType } from '../ds-icon';

export const dsStatuses = ['active', 'running', 'pending', 'draft', 'inactive', 'warning', 'failed'] as const;

export type DsStatus = (typeof dsStatuses)[number];

export interface DsStatusBadgeProps {
	/**
	 * The icon of the status badge
	 */
	icon: IconType;
	/**
	 * The value of the status badge
	 */
	status: DsStatus;
	/**
	 * Additional CSS class names
	 */
	className?: string;
	/**
	 * Additional styles to apply to the component
	 */
	style?: CSSProperties;
	/**
	 * Optional label to display instead of the default status text
	 */
	label?: string;
	/**
	 * Whether the status badge color should be filled
	 * @default true
	 */
	filled?: boolean;
	/**
	 * Whether the status badge size should be small
	 * @default false
	 */
	compact?: boolean;
}
