export interface NavMenuItem {
	/**
	 * Unique identifier for the nav item
	 */
	id: string;
	/**
	 * Display label for the nav item
	 */
	label: string;
	/**
	 * Optional count badge to display
	 */
	count?: number;
	/**
	 * Whether this item is disabled
	 */
	disabled?: boolean;
}

export interface DsNavMenuProps {
	/**
	 * Array of navigation items
	 */
	items: NavMenuItem[];
	/**
	 * Currently selected item
	 */
	selectedItem?: NavMenuItem;
	/**
	 * Callback when an item is selected
	 */
	onSelect?: (item: NavMenuItem) => void;
	/**
	 * Additional CSS class names
	 */
	className?: string;
}
