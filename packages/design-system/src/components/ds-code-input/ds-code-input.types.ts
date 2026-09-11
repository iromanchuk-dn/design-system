import type React from 'react';

export const codeInputSizes = ['small', 'default', 'large'] as const;
export type CodeInputSize = (typeof codeInputSizes)[number];

export interface DsCodeInputProps {
	/**
	 * Unique identifier for the collapsed input
	 */
	id?: string;
	/**
	 * The ref to the collapsed field element
	 */
	ref?: React.Ref<HTMLTextAreaElement>;
	/**
	 * The name of the input
	 */
	name?: string;
	/**
	 * @default default
	 */
	size?: CodeInputSize;
	/**
	 * The current value. Shared by the collapsed input and the panel.
	 */
	value?: string;
	/**
	 * The initial value when rendered.
	 * Use when you don't need to control the value of the input.
	 */
	defaultValue?: string;
	/**
	 * The placeholder text
	 */
	placeholder?: string;
	/**
	 * Whether the input is disabled. Disabling also blocks the panel.
	 * @default false
	 */
	disabled?: boolean;
	/**
	 * Whether the value is read only. The panel still opens so long values stay searchable.
	 * @default false
	 */
	readOnly?: boolean;
	/**
	 * Whether the panel is open. Pair with `onExpandChange`.
	 */
	expanded?: boolean;
	/**
	 * Initial panel state when uncontrolled.
	 * @default false
	 */
	defaultExpanded?: boolean;
	/**
	 * Fires when the panel opens or closes
	 */
	onExpandChange?: (expanded: boolean) => void;
	/**
	 * Callback when the value changes, from either surface
	 */
	onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
	/**
	 * Value change event handler (provides just the value)
	 */
	onValueChange?: (value: string) => void;
	/**
	 * Event handler called when the collapsed input receives focus
	 */
	onFocus?: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
	/**
	 * Event handler called when the collapsed input loses focus
	 */
	onBlur?: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
	/**
	 * The maximum number of characters
	 */
	maxLength?: number;
	/**
	 * User-facing strings
	 */
	locale?: DsCodeInputLocale;
	/**
	 * Optional render slots for customizing parts of the collapsed field.
	 */
	slots?: {
		/**
		 * Adornment to display after the expand button
		 */
		endAdornment?: React.ReactNode;
	};
	/**
	 * Additional CSS class names
	 */
	className?: string;
	/**
	 * Additional styles to apply to the component
	 */
	style?: React.CSSProperties;
}

export interface DsCodeInputLocale {
	/**
	 * Accessible name of the button that opens the panel
	 * @default 'Expand'
	 */
	expand?: string;
	/**
	 * Accessible name of the button that closes the panel
	 * @default 'Collapse'
	 */
	collapse?: string;
	/**
	 * @default 'Search in query'
	 */
	searchPlaceholder?: string;
	/**
	 * Accessible name of the panel's editing area
	 * @default 'Code'
	 */
	codeLabel?: string;
}
