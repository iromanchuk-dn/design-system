import React, { ReactNode } from 'react';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';

/**
 * Props for the DsRadioGroup Root component
 */
export interface DsRadioGroupRootProps
	extends Pick<
		RadioGroupPrimitive.RadioGroupProps,
		'value' | 'defaultValue' | 'disabled' | 'name' | 'required' | 'className' | 'style'
	> {
	/**
	 * Event handler called when the selected value changes
	 */
	onValueChange?: (value: string) => void;
	/**
	 * The children to render (Radio items)
	 */
	children: ReactNode;
}

/**
 * Props for the DsRadioGroup Item component
 */
export interface DsRadioGroupItemProps
	extends Pick<RadioGroupPrimitive.RadioGroupItemProps, 'value' | 'disabled' | 'className' | 'style' | 'id'> {
	/**
	 * Optional label text for the radio item
	 */
	label?: string;
	/**
	 * Optional additional info text displayed below the label
	 */
	labelInfo?: string;
}

/**
 * DEPRECATED: Legacy radio option configuration
 * Use compound component pattern instead: <DsRadioGroup.Root><DsRadioGroup.Item /></DsRadioGroup.Root>
 * @deprecated
 */
export interface DsRadioOptionLegacy<ValueType = string> {
	/**
	 * Display label for the radio option
	 */
	label: string;
	/**
	 * Value associated with this radio option
	 */
	value: ValueType;
	/**
	 * Additional label info for the radio option
	 */
	labelInfo?: string;
	/**
	 * Whether this radio option is disabled
	 */
	disabled?: boolean;
}

/**
 * DEPRECATED: Legacy props for DsRadioGroupLegacy component
 * Use compound component pattern instead
 * @deprecated
 */
export interface DsRadioGroupLegacyProps<TOption extends DsRadioOptionLegacy = DsRadioOptionLegacy>
	extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root> {
	/**
	 * The radio group options
	 */
	options: TOption[];
	/**
	 * The selected value
	 */
	value?: TOption['value'];
	/**
	 * The default selected value
	 */
	defaultValue?: TOption['value'];
	/**
	 * Event handler called when the selected value changes
	 *
	 * @param value
	 */
	onValueChange?: (value: TOption['value']) => void;
	/**
	 * Additional CSS class names
	 */
	className?: string;
	/**
	 * Additional styles to apply to the component
	 */
	style?: React.CSSProperties;
}
