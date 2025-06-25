import { PropsWithChildren } from 'react';

export const codeVariants = ['inline', 'block'] as const;
export type CodeVariant = (typeof codeVariants)[number];

export const codeSizes = ['sm', 'xs'] as const;
export type CodeSize = (typeof codeSizes)[number];

export const codeWeights = ['reg', 'semi-bold'] as const;
export type CodeWeight = (typeof codeWeights)[number];

export interface DsCodeProps extends PropsWithChildren {
	/**
	 * The variant of code display
	 */
	variant?: CodeVariant;
	/**
	 * The size of the code text
	 */
	size?: CodeSize;
	/**
	 * The weight of the code text
	 */
	weight?: CodeWeight;
	/**
	 * Additional CSS class names
	 */
	className?: string;
}
