import { ReactNode } from 'react';
import { FilterAdapter } from '../types/filter-adapter.types';

export interface CustomFilterAdapterConfig<TData, TFilterValue> {
	/**
	 * Unique identifier (should match column accessorKey)
	 */
	id: string;

	/**
	 * Display label for filter navigation
	 */
	label: string;

	/**
	 * Initial/default value for the filter
	 */
	initialValue: TFilterValue;

	/**
	 * Filter function - determines if row matches filter value
	 */
	filterFn: FilterAdapter<TData, TFilterValue>['columnFilterFn'];

	/**
	 * Convert filter value to display chips
	 */
	toChips: FilterAdapter<TData, TFilterValue>['toChips'];

	/**
	 * Remove chip effect from filter value
	 */
	fromChip: FilterAdapter<TData, TFilterValue>['fromChip'];

	/**
	 * Calculate active filter count
	 */
	getActiveCount: FilterAdapter<TData, TFilterValue>['getActiveCount'];

	/**
	 * Check if filter has active values
	 */
	hasActiveFilters: FilterAdapter<TData, TFilterValue>['hasActiveFilters'];

	/**
	 * Render the filter UI
	 */
	renderFilter: (value: TFilterValue, onChange: (value: TFilterValue) => void) => ReactNode;

	/**
	 * Optional custom cell renderer
	 */
	cellRenderer?: (value: any) => ReactNode;
}

/**
 * Factory function to create a custom filter adapter
 * Provides maximum flexibility for app-specific filtering needs
 *
 * Use this when:
 * - You need complex filtering logic
 * - You have a unique UI that doesn't fit generic patterns
 * - You need to combine multiple sub-filters
 */
export function createCustomFilterAdapter<TData, TFilterValue>(
	config: CustomFilterAdapterConfig<TData, TFilterValue>,
): FilterAdapter<TData, TFilterValue> {
	return {
		id: config.id,
		label: config.label,
		initialValue: config.initialValue,
		columnFilterFn: config.filterFn,
		cellRenderer: config.cellRenderer,
		toChips: config.toChips,
		fromChip: config.fromChip,
		getActiveCount: config.getActiveCount,
		hasActiveFilters: config.hasActiveFilters,
		reset: () => config.initialValue,
		renderFilter: config.renderFilter,
	};
}
