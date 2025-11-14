import { CheckboxFilter } from '../components/select-filter/select-filter';
import { RangeFilter } from '../components/range-filter/range-filter';

/**
 * Renders filter UI based on the filter configuration
 * Bridges adapter render output to actual components
 */
export const FilterRenderer = ({ filterConfig }: { filterConfig: any }) => {
	if (!filterConfig) return null;

	const { type } = filterConfig;

	switch (type) {
		case 'checkbox':
			return (
				<CheckboxFilter
					items={filterConfig.items}
					renderer={filterConfig.renderer}
					selectedItems={filterConfig.selectedItems}
					onSelectionChange={filterConfig.onSelectionChange}
				/>
			);

		case 'dual-range': {
			const { fields, value, onChange } = filterConfig;
			return (
				<div>
					{Object.entries(fields).map(([fieldKey, fieldLabel]) => (
						<RangeFilter
							key={fieldKey}
							label={fieldLabel as string}
							value={value[fieldKey] || {}}
							onChange={(rangeValue) =>
								onChange({
									...value,
									[fieldKey]: rangeValue,
								})
							}
							onClear={() =>
								onChange({
									...value,
									[fieldKey]: {},
								})
							}
						/>
					))}
				</div>
			);
		}

		default:
			// For custom filters, just render as-is
			return filterConfig;
	}
};
