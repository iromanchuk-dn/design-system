import { useState } from 'react';
import DsTextInput from '../../../../ds-text-input/ds-text-input';
import DsButton from '../../../../ds-button/ds-button';
import styles from './range-filter.module.scss';

export interface RangeFilterValue {
	from?: number;
	to?: number;
}

export interface RangeFilterProps {
	label: string;
	value: RangeFilterValue;
	onChange: (value: RangeFilterValue) => void;
	onClear?: () => void;
}

export const RangeFilter = ({ label, value, onChange, onClear }: RangeFilterProps) => {
	const [localFrom, setLocalFrom] = useState(value.from?.toString() || '');
	const [localTo, setLocalTo] = useState(value.to?.toString() || '');

	const handleFromChange = (val: string) => {
		setLocalFrom(val);
		const numVal = val ? parseInt(val, 10) : undefined;
		onChange({ from: numVal, to: value.to });
	};

	const handleToChange = (val: string) => {
		setLocalTo(val);
		const numVal = val ? parseInt(val, 10) : undefined;
		onChange({ from: value.from, to: numVal });
	};

	const handleClear = () => {
		setLocalFrom('');
		setLocalTo('');
		if (onClear) {
			onClear();
		}
	};

	const hasValue = value.from !== undefined || value.to !== undefined;

	return (
		<div className={styles.rangeFilter}>
			<div className={styles.rangeFilter__header}>
				<div className={styles.rangeFilter__label}>{label}</div>
				{hasValue && onClear && (
					<DsButton design="v1.2" buttonType="tertiary" size="small" onClick={handleClear}>
						Clear
					</DsButton>
				)}
			</div>
			<div className={styles.rangeFilter__inputs}>
				<div className={styles.rangeFilter__inputGroup}>
					<label className={styles.rangeFilter__inputLabel}>From</label>
					<DsTextInput
						type="number"
						placeholder=""
						value={localFrom}
						onValueChange={handleFromChange}
						size="default"
					/>
				</div>
				<div className={styles.rangeFilter__inputGroup}>
					<label className={styles.rangeFilter__inputLabel}>To</label>
					<DsTextInput
						type="number"
						placeholder=""
						value={localTo}
						onValueChange={handleToChange}
						size="default"
					/>
				</div>
			</div>
		</div>
	);
};
