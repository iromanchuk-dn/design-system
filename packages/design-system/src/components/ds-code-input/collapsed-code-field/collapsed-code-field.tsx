import type { ChangeEvent, FocusEvent, KeyboardEvent, ReactNode, Ref } from 'react';
import classNames from 'classnames';
import type { CodeInputSize } from '../ds-code-input.types';
import styles from './collapsed-code-field.module.scss';
import { DsStack } from '../../ds-stack';

export interface CollapsedCodeFieldProps {
	id?: string;
	ref?: Ref<HTMLTextAreaElement>;
	name?: string;
	size: CodeInputSize;
	value: string;
	placeholder?: string;
	disabled: boolean;
	readOnly: boolean;
	maxLength?: number;
	adornment: ReactNode;
	className?: string;
	onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
	onFocus?: (event: FocusEvent<HTMLTextAreaElement>) => void;
	onBlur?: (event: FocusEvent<HTMLTextAreaElement>) => void;
	onEnter: () => void;
}

/**
 * The collapsed, single-line surface.
 *
 * It is a `textarea` rather than an `input` on purpose: `input` runs the HTML value
 * sanitization algorithm, which deletes newlines outright — `'a\nb'` becomes `'ab'`.
 * Since this field and the panel edit one shared string, an `input` here would destroy
 * every line break in a multi-line value on the first keystroke. `white-space: pre`
 * gives the single-line, horizontally scrolling look the design asks for without that.
 */
const CollapsedCodeField = ({
	id,
	ref,
	name,
	size,
	value,
	placeholder,
	disabled,
	readOnly,
	maxLength,
	adornment,
	className,
	onChange,
	onFocus,
	onBlur,
	onEnter,
}: CollapsedCodeFieldProps) => {
	const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
		if (event.key !== 'Enter') {
			return;
		}

		// A newline typed here would be invisible on a single-line surface, so offer the
		// panel — which is where multi-line editing belongs — instead of inserting it.
		event.preventDefault();
		onEnter();
	};

	return (
		<div className={classNames(styles.container, styles[size], className)}>
			<textarea
				id={id}
				ref={ref}
				name={name}
				className={styles.input}
				rows={1}
				value={value}
				placeholder={placeholder}
				disabled={disabled}
				readOnly={readOnly}
				maxLength={maxLength}
				spellCheck={false}
				autoComplete="off"
				onChange={onChange}
				onFocus={onFocus}
				onBlur={onBlur}
				onKeyDown={handleKeyDown}
			/>
			<DsStack direction="row" alignItems="center" flex="none">
				{adornment}
			</DsStack>
		</div>
	);
};

export default CollapsedCodeField;
