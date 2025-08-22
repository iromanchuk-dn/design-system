import type { Meta, StoryObj } from '@storybook/react';
import DsSpinner from './ds-spinner';
import styles from './ds-spinner.stories.module.scss';

const meta: Meta<typeof DsSpinner> = {
	title: 'Design System/Spinner',
	component: DsSpinner,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		size: {
			control: { type: 'number' },
			description: 'The size of the spinner in pixels',
		},
		width: {
			control: { type: 'number' },
			description: 'The thickness of the progress arc',
		},
		progress: {
			control: { type: 'number', min: 0, max: 100 },
			description: 'Progress percentage (0-100). If not provided, shows a continuous spinning animation',
		},
		color: {
			control: { type: 'color' },
			description: 'Color of the progress arc',
		},
		outlineColor: {
			control: { type: 'color' },
			description: 'Color of the background outline (optional)',
		},
		speed: {
			control: { type: 'number', min: 0.1, max: 10, step: 0.1 },
			description: 'Rotation speed in seconds',
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
type Story = StoryObj<typeof DsSpinner>;

export const Default: Story = {
	args: {},
};

export const WithProgress: Story = {
	args: {
		size: 120,
		width: 16,
		progress: 75,
		color: 'var(--color-icon-success)',
	},
};

export const Small: Story = {
	args: {
		size: 50,
		width: 4.5,
		progress: 45,
		color: 'var(--color-font-warning)',
	},
};

export const Large: Story = {
	args: {
		size: 160,
		width: 20,
		progress: 60,
		color: 'var(--color-icon-danger)',
	},
};

export const WithOutline: Story = {
	args: {
		size: 120,
		width: 16,
		progress: 30,
		color: 'var(--color-border-action-primary)',
		outlineColor: 'var(--color-background-tertiary-selected-weak)',
	},
};

export const ModalLoading: Story = {
	render: () => (
		<div className={styles.modalOverlay}>
			<div className={styles.modalContent}>
				<DsSpinner />
				<div className={styles.modalText}>
					<p className={styles.modalTextPrimary}>Explanation text will describe the process.</p>
					<p className={styles.modalTextSecondary}>Two lines will be aimed for this.</p>
				</div>
			</div>
		</div>
	),
};
