import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';
import DsStatusBadge from './ds-status-badge';
import { DsStatus } from './ds-status-badge.types';
import { IconType } from '../ds-icon';
import styles from './ds-status-badge.stories.module.scss';

const meta: Meta<typeof DsStatusBadge> = {
	title: 'Design System/StatusBadge',
	component: DsStatusBadge,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		icon: {
			control: 'text',
			description: 'Icon to display in the badge',
		},
		status: {
			control: 'select',
			options: ['active', 'running', 'pending', 'draft', 'inactive', 'warning', 'failed'],
			description: 'Status type of the badge',
		},
		label: {
			control: 'text',
			description: 'Optional label to display instead of the default status text',
		},
		filled: {
			control: 'boolean',
			description: 'Whether the badge has a filled background',
		},
		compact: {
			control: 'boolean',
			description: 'Whether to use compact size (20px height)',
		},
		className: {
			control: 'text',
			description: 'Additional CSS class names',
		},
		style: {
			control: 'object',
			description: 'Inline styles to apply to the component',
		},
	},
};

export default meta;
type Story = StoryObj<typeof DsStatusBadge>;

export const Default: Story = {
	args: {
		icon: 'check_circle',
		status: 'active',
		filled: true,
		compact: false,
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);

		// Verify component renders correctly
		const component = canvas.getByText('active');
		await expect(component).toBeTruthy();
	},
};

export const All: Story = {
	render: () => {
		const statuses: Array<{
			status: DsStatus;
			icon: IconType;
		}> = [
			{ status: 'active', icon: 'check_circle' },
			{ status: 'running', icon: 'change_circle' },
			{ status: 'pending', icon: 'pause_circle' },
			{ status: 'draft', icon: 'stylus_note' },
			{ status: 'inactive', icon: 'stop_circle' },
			{ status: 'warning', icon: 'warning' },
			{ status: 'failed', icon: 'cancel' },
		];

		return (
			<div className={styles.storiesContainer}>
				<div className={styles.storiesRow}>
					{/* Filled variants - Default */}
					<div className={styles.storiesSection}>
						<div className={styles.sectionTitle}>Filled</div>
						<div className={styles.storiesList}>
							{statuses.map(({ status, icon }) => (
								<DsStatusBadge
									key={`filled-24-${status}`}
									icon={icon}
									status={status}
									filled={true}
									compact={false}
								/>
							))}
						</div>
					</div>

					{/* Light variants - Default */}
					<div className={styles.storiesSection}>
						<div className={styles.sectionTitle}>Light</div>
						<div className={styles.storiesList}>
							{statuses.map(({ status, icon }) => (
								<DsStatusBadge
									key={`light-24-${status}`}
									icon={icon}
									status={status}
									filled={false}
									compact={false}
								/>
							))}
						</div>
					</div>
				</div>

				<div className={styles.storiesRow}>
					{/* Filled variants - Compact */}
					<div className={styles.storiesSection}>
						<div className={styles.sectionTitle}>Filled - Compact</div>
						<div className={styles.storiesList}>
							{statuses.map(({ status, icon }) => (
								<DsStatusBadge
									key={`filled-20-${status}`}
									icon={icon}
									status={status}
									filled={true}
									compact={true}
								/>
							))}
						</div>
					</div>

					{/* Light variants - Compact */}
					<div className={styles.storiesSection}>
						<div className={styles.sectionTitle}>Light - Compact</div>
						<div className={styles.storiesList}>
							{statuses.map(({ status, icon }) => (
								<DsStatusBadge
									key={`light-20-${status}`}
									icon={icon}
									status={status}
									filled={false}
									compact={true}
								/>
							))}
						</div>
					</div>
				</div>
			</div>
		);
	},
};
