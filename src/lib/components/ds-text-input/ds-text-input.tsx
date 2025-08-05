import React from 'react';
import classNames from 'classnames';
import styles from './ds-text-input.module.scss';
import { DsTextInputProps } from './ds-text-input.types';

const DsTextInput: React.FC<DsTextInputProps> = ({
	size = 'default',
	type = 'text',
	onChange,
	onValueChange,
	className,
	style = {},
	value,
	defaultValue,
	placeholder,
	disabled = false,
	startAdornment,
	endAdornment,
}) => {
	const containerClass = classNames(
		styles.textInputContainer,
		{
			[styles.small]: size === 'small',
			[styles.default]: size === 'default',
		},
		className,
	);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const newValue = event.target.value;
		onChange?.(event);
		onValueChange?.(newValue);
	};

	return (
		<div className={containerClass} style={style}>
			{startAdornment && <div className={classNames(styles.adornment, styles.start)}>{startAdornment}</div>}
			<input
				className={classNames(styles.input)}
				type={type}
				value={value}
				defaultValue={defaultValue}
				placeholder={placeholder}
				disabled={disabled}
				onChange={handleChange}
			/>
			{endAdornment && <div className={classNames(styles.adornment, styles.end)}>{endAdornment}</div>}
		</div>
	);
};

export default DsTextInput;
