import type { Meta, StoryObj } from '@storybook/react';
import DsSpinner from './ds-spinner';

const meta: Meta<typeof DsSpinner> = {
	title: 'Design System/Spinner',
	component: DsSpinner,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		size: {
			control: { type: 'select' },
			options: ['small', 'default', 'large'],
			description: 'The size of the spinner',
		},
		variant: {
			control: { type: 'select' },
			options: ['default', 'overlay'],
			description: 'The variant of the spinner',
		},
		tooltip: {
			control: 'text',
			description: 'Tooltip text to display on hover',
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
	args: {
		size: 'default',
	},
};

export const Small: Story = {
	args: {
		size: 'small',
	},
};

export const Large: Story = {
	args: {
		size: 'large',
	},
};

export const WithTooltip: Story = {
	args: {
		size: 'default',
		tooltip: 'Loading data...',
	},
};

export const AllSizes: Story = {
	render: () => (
		<div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
			<DsSpinner size="small" />
			<DsSpinner size="default" />
			<DsSpinner size="large" />
		</div>
	),
};

export const InContext: Story = {
	render: () => (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				gap: '16px',
				alignItems: 'center',
				padding: '20px',
				background: '#f5f5f5',
				borderRadius: '8px',
			}}
		>
			<div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
				<DsSpinner size="small" />
				<span>Loading small items...</span>
			</div>
			<div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
				<DsSpinner size="default" />
				<span>Loading data...</span>
			</div>
			<div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
				<DsSpinner size="large" />
				<span>Loading large dataset...</span>
			</div>
		</div>
	),
};
