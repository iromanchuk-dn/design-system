import { ReactNode } from 'react';
import { DsCheckbox } from '@design-system/ui';

export interface CheckboxFilterItem<TValue = any> {
	value: TValue;
	label: string;
}

export interface CheckboxFilterProps {
	items: CheckboxFilterItem[];
	renderer?: (item: CheckboxFilterItem) => ReactNode;
	selectedItems: CheckboxFilterItem[];
	onSelectionChange: (selectedItems: CheckboxFilterItem[]) => void;
}

export const CheckboxFilter = ({
	items,
	renderer,
	selectedItems,
	onSelectionChange,
}: CheckboxFilterProps) => {
	const handleCheckedChange = (selected: CheckboxFilterItem, checked: boolean) => {
		if (checked) {
			onSelectionChange([...selectedItems, selected]);
		} else {
			onSelectionChange(selectedItems.filter((item) => item.value !== selected.value));
		}
	};

	return items.map((item) => {
		const label = renderer ? renderer(item) : item.label;
		const checked = selectedItems.findIndex((selectedItem) => selectedItem.value === item.value) > -1;
		return (
			<DsCheckbox
				key={item.value}
				label={label}
				checked={checked}
				onCheckedChange={(newState) => handleCheckedChange(item, newState === true)}
			/>
		);
	});
};
