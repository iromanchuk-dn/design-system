import { useState } from 'react';
import classNames from 'classnames';
import { DsButton, DsIcon, DsModal } from '@design-system/ui';
import { TableFilterModalProps, TableFilterNavItem } from './table-filter-modal.types';
import styles from './table-filter-modal.module.scss';

/**
 * Specialized filter modal with built-in filter navigation
 */
const TableFilterModal = ({
	open,
	onOpenChange,
	columns,
	className,
	onClearAll,
	onApply,
	filterNavItems = [],
	children,
	applyDisabled = false,
	clearAllDisabled = false,
}: TableFilterModalProps) => {
	const [selectedFilter, setSelectedFilter] = useState<TableFilterNavItem>(filterNavItems[0]);

	return (
		<DsModal
			open={open}
			onOpenChange={onOpenChange}
			columns={columns}
			className={classNames(styles.filterModal, className)}
		>
			<DsModal.Header className={styles.filterHeader}>
				<div className={styles.headerLeft}>
					<DsIcon icon="filter_list" size="small" />
					<DsModal.Title>Filters</DsModal.Title>
				</div>
				<DsModal.CloseTrigger />
			</DsModal.Header>

			<DsModal.Body className={styles.filterBody}>
				<FilterNav items={filterNavItems} selectedItem={selectedFilter} onSelect={setSelectedFilter} />
				<div className={styles.filterContent}>{children?.(selectedFilter)}</div>
			</DsModal.Body>

			<DsModal.Footer className={styles.filterFooter}>
				<DsButton
					design="v1.2"
					variant="filled"
					buttonType="secondary"
					onClick={onClearAll}
					disabled={clearAllDisabled}
				>
					<DsIcon icon="close" size="tiny" />
					Clear all
				</DsButton>
				<DsModal.Actions>
					<DsButton
						design="v1.2"
						variant="filled"
						buttonType="primary"
						onClick={onApply}
						disabled={applyDisabled}
					>
						Apply
					</DsButton>
				</DsModal.Actions>
			</DsModal.Footer>
		</DsModal>
	);
};

const FilterNav = ({
	items,
	selectedItem,
	onSelect,
}: {
	items: TableFilterNavItem[];
	selectedItem?: TableFilterNavItem;
	onSelect?: (item: TableFilterNavItem) => void;
}) => (
	<nav className={styles.filterNav}>
		{items.map((item) => (
			<button
				key={item.id}
				className={classNames(styles.filterNavItem, {
					[styles.selected]: item.id === selectedItem?.id,
				})}
				disabled={item.disabled}
				onClick={() => onSelect?.(item)}
				aria-current={item.id === selectedItem?.id ? 'true' : undefined}
			>
				<span className={styles.filterNavItemLabel}>{item.label}</span>
				{item.count !== undefined && item.count > 0 && (
					<span className={styles.filterNavItemCount}>{item.count}</span>
				)}
			</button>
		))}
	</nav>
);

export default TableFilterModal;
