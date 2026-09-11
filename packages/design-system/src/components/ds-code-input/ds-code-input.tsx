import { type ChangeEvent, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { DsButtonV3, type ButtonV3Size } from '../ds-button-v3';
import { DsPopover } from '../ds-popover';
import { CollapsedCodeField } from './collapsed-code-field';
import { DsCodeInputPanel } from './ds-code-input-panel';
import styles from './ds-code-input.module.scss';
import type { CodeInputSize, DsCodeInputProps } from './ds-code-input.types';

const toggleSizes: Record<CodeInputSize, ButtonV3Size> = Object.freeze({
	small: 'tiny',
	default: 'small',
	large: 'small',
});

const defaultLocale = Object.freeze({
	expand: 'Expand',
	collapse: 'Collapse',
	searchPlaceholder: 'Search in query',
	codeLabel: 'Code',
});

/**
 * Single-line field for code, such as a query expression. Expanding it opens a panel
 * with a larger editing area and a search box that highlights every match.
 * Both surfaces render the same `value` and report through the same callbacks.
 *
 * @summary code field that expands into a searchable editing panel
 */
const DsCodeInput = ({
	id,
	ref,
	name,
	size = 'default',
	value,
	defaultValue,
	placeholder,
	disabled = false,
	readOnly = false,
	expanded,
	defaultExpanded = false,
	onExpandChange,
	onChange,
	onValueChange,
	onFocus,
	onBlur,
	maxLength,
	locale,
	slots,
	className,
	style,
}: DsCodeInputProps) => {
	const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue ?? '');
	const [uncontrolledExpanded, setUncontrolledExpanded] = useState(defaultExpanded);
	const [anchorWidth, setAnchorWidth] = useState<number>();
	const rootRef = useRef<HTMLDivElement>(null);

	const strings = { ...defaultLocale, ...locale };

	// The panel is as wide as the field. Measuring the field here rather than using the
	// positioner's `sameWidth` (or its `--reference-width`) keeps the panel's width from
	// feeding back into the observer that computes it, which otherwise thrashes layout.
	useEffect(() => {
		const anchor = rootRef.current;

		if (!anchor) {
			return;
		}

		const observer = new ResizeObserver(() => {
			setAnchorWidth(anchor.offsetWidth);
		});

		observer.observe(anchor);

		return () => {
			observer.disconnect();
		};
	}, []);

	const isValueControlled = value !== undefined;
	const currentValue = isValueControlled ? value : uncontrolledValue;

	const isExpandedControlled = expanded !== undefined;
	const isExpanded = disabled ? false : isExpandedControlled ? expanded : uncontrolledExpanded;

	const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
		const newValue = event.target.value;

		if (!isValueControlled) {
			setUncontrolledValue(newValue);
		}

		onChange?.(event);
		onValueChange?.(newValue);
	};

	const handleOpenChange = (open: boolean) => {
		if (disabled) {
			return;
		}

		if (!isExpandedControlled) {
			setUncontrolledExpanded(open);
		}

		onExpandChange?.(open);
	};

	return (
		<DsPopover.Root
			open={isExpanded}
			side="bottom"
			align="start"
			gutter={4}
			getAnchorElement={() => rootRef.current}
			onOpenChange={handleOpenChange}
		>
			<div ref={rootRef} className={classNames(styles.root, className)} style={style}>
				<CollapsedCodeField
					id={id}
					ref={ref}
					name={name}
					size={size}
					value={currentValue}
					placeholder={placeholder}
					disabled={disabled}
					readOnly={readOnly}
					maxLength={maxLength}
					onChange={handleChange}
					onFocus={onFocus}
					onBlur={onBlur}
					onEnter={() => {
						handleOpenChange(true);
					}}
					adornment={
						<>
							<DsPopover.Trigger>
								<DsButtonV3
									variant="tertiary"
									size={toggleSizes[size]}
									icon={isExpanded ? 'collapse_content' : 'expand_content'}
									aria-label={isExpanded ? strings.collapse : strings.expand}
									disabled={disabled}
								/>
							</DsPopover.Trigger>
							{slots?.endAdornment}
						</>
					}
				/>
			</div>

			<DsPopover.Panel width={anchorWidth} className={styles.panel} aria-label={strings.codeLabel}>
				{/*
				 * Ark keeps a closed panel mounted, so rendering the body only while open is
				 * what discards the search query between visits — no reset bookkeeping needed.
				 */}
				{isExpanded && (
					<DsCodeInputPanel
						value={currentValue}
						readOnly={readOnly}
						searchPlaceholder={strings.searchPlaceholder}
						codeLabel={strings.codeLabel}
						onChange={handleChange}
					/>
				)}
			</DsPopover.Panel>
		</DsPopover.Root>
	);
};

DsCodeInput.displayName = 'DsCodeInput';

export default DsCodeInput;
