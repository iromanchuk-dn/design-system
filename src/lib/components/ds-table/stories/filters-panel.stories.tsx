import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { ColumnDef, ColumnFilter } from '@tanstack/react-table';
import DsIcon from '../../ds-icon/ds-icon';
import { IconType } from '../../ds-icon/ds-icon.types';
import DsTable from '../ds-table';
import DsButton from '../../ds-button/ds-button';
import DsStatusBadge from '../../ds-status-badge/ds-status-badge';
import { DsStatus } from '../../ds-status-badge/ds-status-badge.types';
import { TableFilterModal, TableFilterNavItem } from './components/table-filter-modal';
import { ChipFilterPanel, FilterChipItem } from '../../../../widgets';
import { CheckboxFilter, CheckboxFilterItem } from './components/select-filter/select-filter';
import styles from '../ds-table.stories.module.scss';

export enum WorkflowCategory {
	NetworkBuilt = 'Network Built',
	OpticalOptimization = 'Optical Optimization',
	ServiceProvisioning = 'Service Provisioning',
}

type Workflow = {
	id: string;
	name: string;
	status: DsStatus;
	runningCompleted: string;
	category: WorkflowCategory;
	version: string;
	lastEdited: string;
};

const columns: ColumnDef<Workflow>[] = [
	{
		accessorKey: 'status',
		header: 'Status',
		cell: (info) => info.getValue(),
	},
	{
		accessorKey: 'name',
		header: 'Name',
		cell: (info) => info.getValue(),
	},
	{
		accessorKey: 'runningCompleted',
		header: 'Running/completed',
		cell: (info) => info.getValue(),
	},
	{
		accessorKey: 'category',
		header: 'Category',
		cell: (info) => info.getValue(),
	},
	{
		accessorKey: 'version',
		header: 'Version',
		cell: (info) => info.getValue(),
	},
	{
		accessorKey: 'lastEdited',
		header: 'Last edited',
		cell: (info) => info.getValue(),
	},
];

const defaultData: Workflow[] = [
	{
		id: '1',
		name: 'Scheduled Config Backup',
		status: 'active',
		runningCompleted: '45/123',
		category: WorkflowCategory.NetworkBuilt,
		version: '000.0003',
		lastEdited: '23-05-2024 04:47 PM',
	},
	{
		id: '2',
		name: 'Network Provisioning',
		status: 'running',
		runningCompleted: '443/123',
		category: WorkflowCategory.NetworkBuilt,
		version: '000.0002',
		lastEdited: '23-05-2024 04:47 PM',
	},
	{
		id: '3',
		name: 'Service Provisioning',
		status: 'inactive',
		runningCompleted: '0/243',
		category: WorkflowCategory.NetworkBuilt,
		version: '000.0033',
		lastEdited: '23-05-2024 04:47 PM',
	},
	{
		id: '4',
		name: 'Assign IPv4 Address',
		status: 'active',
		runningCompleted: '45/123',
		category: WorkflowCategory.NetworkBuilt,
		version: '000.0001',
		lastEdited: '23-05-2024 04:47 PM',
	},
	{
		id: '5',
		name: 'Shutdown Decommissioned Device',
		status: 'active',
		runningCompleted: '45/123',
		category: WorkflowCategory.OpticalOptimization,
		version: '000.0022',
		lastEdited: '23-05-2024 04:47 PM',
	},
	{
		id: '6',
		name: 'Optical Power Level Calibration',
		status: 'draft',
		runningCompleted: '0/23',
		category: WorkflowCategory.OpticalOptimization,
		version: '000.0001',
		lastEdited: '23-05-2024 04:47 PM',
	},
	{
		id: '7',
		name: 'Deploy Layer 2 EVPN Instance',
		status: 'pending',
		runningCompleted: '49/123',
		category: WorkflowCategory.OpticalOptimization,
		version: '000.0012',
		lastEdited: '23-05-2024 04:47 PM',
	},
	{
		id: '8',
		name: 'Initiate Scheduled Firmware Upgrade',
		status: 'active',
		runningCompleted: '45/123',
		category: WorkflowCategory.ServiceProvisioning,
		version: '000.0010',
		lastEdited: '23-05-2024 04:47 PM',
	},
	{
		id: '9',
		name: 'Enable High Availability Mode',
		status: 'running',
		runningCompleted: '45/123',
		category: WorkflowCategory.ServiceProvisioning,
		version: '000.0001',
		lastEdited: '23-05-2024 04:47 PM',
	},
	{
		id: '10',
		name: 'Audit Access Control Policies',
		status: 'active',
		runningCompleted: '45/123',
		category: WorkflowCategory.ServiceProvisioning,
		version: '000.0001',
		lastEdited: '23-05-2024 04:47 PM',
	},
	{
		id: '11',
		name: 'Synchronize NTP Across Network Nodes',
		status: 'warning',
		runningCompleted: '49/123',
		category: WorkflowCategory.ServiceProvisioning,
		version: '000.0001',
		lastEdited: '23-05-2024 04:47 PM',
	},
	{
		id: '12',
		name: 'Validate Optical Link Integrity',
		status: 'failed',
		runningCompleted: '45/123',
		category: WorkflowCategory.NetworkBuilt,
		version: '000.0001',
		lastEdited: '03-05-2024 04:47 PM',
	},
];

// --- Storybook Meta ---
// IMPORTANT: Keep the same title as ds-table.stories.tsx to group under same section
const meta: Meta<typeof DsTable<Workflow, unknown>> = {
	title: 'Design System/Table',
	component: DsTable,
	parameters: {
		layout: 'fullscreen',
	},
	tags: ['autodocs'],
	args: {
		columns: columns,
		data: defaultData,
		stickyHeader: true,
		bordered: true,
		fullWidth: true,
		highlightOnHover: true,
		expandable: false,
		emptyState: <div>No data available</div>,
		onRowClick: (row) => console.log('Row clicked:', row),
	},
	decorators: [
		(Story) => (
			<div className={styles.storyPadding}>
				<style>
					{`
            #storybook-root, html, body { height: 100%; }
          `}
				</style>
				<Story />
			</div>
		),
	],
};

export default meta;
type Story = StoryObj<typeof DsTable<Workflow, unknown>>;

// --- Stories ---

export const FiltersPanel: Story = {
	name: 'With Filters Panel',
	render: function Render(args) {
		const statusItems = [
			{ value: 'active' as DsStatus, label: 'Active' },
			{ value: 'running' as DsStatus, label: 'Running' },
			{ value: 'pending' as DsStatus, label: 'Pending' },
			{ value: 'draft' as DsStatus, label: 'Draft' },
			{ value: 'inactive' as DsStatus, label: 'Inactive' },
			{ value: 'warning' as DsStatus, label: 'Warning' },
			{ value: 'failed' as DsStatus, label: 'Failed' },
		];

		const [isOpen, setIsOpen] = useState(false);
		const [columnFilters, setColumnFilters] = useState<ColumnFilter[]>([]);
		const [modalFilters, setModalFilters] = useState<TableFilterNavItem[]>(
			args.columns.map((col) => ({
				id: col.accessorKey,
				label: col.header,
				count: 0,
			})),
		);
		const [filterChips, setFilterChips] = useState<FilterChipItem[]>([]);

		const [selectedStatuses, setSelectedStatuses] = useState<CheckboxFilterItem[]>(statusItems);

		const getStatusIcon = (status: DsStatus): IconType => {
			switch (status) {
				case 'active':
					return 'check_circle';
				case 'running':
					return 'change_circle';
				case 'pending':
					return 'pause_circle';
				case 'draft':
					return 'stylus_note';
				case 'inactive':
					return 'stop_circle';
				case 'warning':
					return 'warning';
				case 'failed':
					return 'cancel';
				default:
					return 'check_circle';
			}
		};

		const renderStatus = (status: DsStatus) => {
			const icon = getStatusIcon(status);
			return <DsStatusBadge icon={icon} status={status} size="small" />;
		};

		const statusColumnDef: ColumnDef<Workflow> = {
			accessorKey: 'status',
			header: 'Status',
			filterFn: (row, columnId, filterValue) => filterValue.includes(row.getValue(columnId)),
			cell: (info) => renderStatus(info.getValue() as DsStatus),
		};

		const tableColumns = args.columns.map((col) =>
			(col as { accessorKey: string }).accessorKey === 'status' ? statusColumnDef : col,
		);

		const handleApply = () => {
			setColumnFilters([
				{
					id: 'status',
					value: selectedStatuses.map((s) => s.value),
				},
			]);
			setFilterChips([
				...selectedStatuses.map((status) => ({
					id: `status_${status.value}`,
					label: `Status: ${status.label}`,
					metadata: {
						key: 'status',
						value: status.value,
					},
				})),
			]);
			setIsOpen(false);
		};

		const handleClearAll = () => {
			setSelectedStatuses(statusItems);
			setColumnFilters([
				{
					id: 'status',
					value: statusItems.map((s) => s.value),
				},
			]);
			setFilterChips([]);
			setIsOpen(false);
		};

		const handleFilterDelete = (filter: FilterChipItem) => {
			const filteredChips = filterChips.filter((item) => item.id !== filter.id);
			if (filteredChips.length > 0) {
				setFilterChips((prev) => prev.filter((item) => item.id !== filter.id));
				setSelectedStatuses((prev) => prev.filter((item) => item.value !== filter.metadata?.value));
				setColumnFilters([
					{
						id: 'status',
						value: selectedStatuses.filter((s) => s.value !== filter.metadata?.value).map((s) => s.value),
					},
				]);
			} else {
				setSelectedStatuses(statusItems);
				setColumnFilters([
					{
						id: 'status',
						value: statusItems.map((s) => s.value),
					},
				]);
				setFilterChips([]);
			}
		};

		return (
			<div className={styles.tableFilterContainer}>
				<div className={styles.toolbar}>
					<DsButton design="v1.2" buttonType="secondary" onClick={() => setIsOpen(true)}>
						<DsIcon size="tiny" icon="filter_list" />
					</DsButton>
				</div>
				{filterChips.length > 0 && (
					<ChipFilterPanel
						filters={filterChips}
						onClearAll={handleClearAll}
						onFilterDelete={handleFilterDelete}
					/>
				)}
				<DsTable
					{...args}
					columns={tableColumns}
					columnFilters={columnFilters}
					onColumnFiltersChange={setColumnFilters}
				/>
				<TableFilterModal
					open={isOpen}
					onOpenChange={setIsOpen}
					columns={8}
					filterNavItems={modalFilters}
					onApply={handleApply}
					onClearAll={handleClearAll}
				>
					{(selectedFilter) => {
						if (selectedFilter.id === 'status') {
							return (
								<CheckboxFilter
									items={statusItems}
									renderer={(item) => renderStatus(item.value as DsStatus)}
									selectedItems={selectedStatuses}
									onSelectionChange={setSelectedStatuses}
								/>
							);
						}
						return JSON.stringify(selectedFilter);
					}}
				</TableFilterModal>
			</div>
		);
	},
	args: {},
};
