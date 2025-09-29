import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, waitFor, within } from '@storybook/test';
import { useState } from 'react';
import DsAlertBanner from '../ds-alert-banner';
import { DsButton } from '../../ds-button';
import { alertBannerVariants, DsAlertBannerProps } from '../ds-alert-banner.types';
import styles from './ds-alert-banner.stories.module.scss';

const meta: Meta<typeof DsAlertBanner> = {
	title: 'Design System/AlertBanner/Inline',
	component: DsAlertBanner,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		open: {
			control: 'boolean',
			description: 'Controls whether the alert banner is visible',
		},
		variant: {
			control: 'select',
			options: alertBannerVariants,
			description: 'The variant of the alert banner',
		},
		title: {
			control: 'text',
			description: 'The title of the alert banner',
		},
		description: {
			control: 'text',
			description: 'The description text of the alert banner',
		},
		closable: {
			control: 'boolean',
			description: 'Whether the alert banner can be closed with an X button',
		},
		className: {
			control: 'text',
			description: 'Additional CSS class names',
		},
		inline: {
			control: 'boolean',
			description:
				'Whether the alert banner should be inline (normal document flow) instead of global (designed for top of the page)',
		},
		style: {
			control: 'object',
			description: 'Inline styles to apply to the component',
		},
		onOpenChange: {
			action: 'onOpenChange',
			description: 'Callback fired when the alert banner should be closed',
		},
	},
};

export default meta;
type Story = StoryObj<typeof DsAlertBanner>;

// Controlled wrapper for stories
const ControlledAlertBanner = (args: DsAlertBannerProps) => {
	const [open, setOpen] = useState(args.open ?? true);
	return <DsAlertBanner {...args} open={open} onOpenChange={setOpen} />;
};

export const InfoBlue: Story = {
	render: ControlledAlertBanner,
	args: {
		open: true,
		inline: true,
		variant: 'info-blue',
		title: 'Information',
		description: 'This is a blue informational alert message.',
		closable: true,
		icon: 'info',
		children: (
			<div className={styles.inlineActions}>
				<button className={styles.primary}>Action</button>
				<button>Dismiss</button>
			</div>
		),
	},
};

export const InfoNeutral: Story = {
	render: ControlledAlertBanner,
	args: {
		open: true,
		inline: true,
		variant: 'info-neutral',
		title: 'Information',
		description: 'This is an informational alert message.',
		closable: true,
	},
};

export const Warning: Story = {
	render: ControlledAlertBanner,
	args: {
		open: true,
		inline: true,
		variant: 'warning',
		title: 'Warning',
		description: 'This is a warning alert message. Please pay attention.',
		closable: true,
		icon: 'warning',
	},
};

export const Error: Story = {
	render: ControlledAlertBanner,
	args: {
		open: true,
		inline: true,
		variant: 'error',
		title: 'Error',
		description: 'Something went wrong. Please try again.',
		closable: true,
		icon: 'error',
	},
};

export const ErrorNoTitle: Story = {
	render: ControlledAlertBanner,
	args: {
		open: true,
		inline: true,
		variant: 'error',
		description: 'Something went wrong. Please try again.',
		closable: true,
		icon: 'error',
	},
};

export const Success: Story = {
	render: ControlledAlertBanner,
	args: {
		open: true,
		inline: true,
		variant: 'success',
		title: 'Success',
		description: 'Your action was completed successfully!',
		closable: true,
		icon: 'check_circle',
	},
};

export const WithActions: Story = {
	render: function Render() {
		const [open, setOpen] = useState(false);

		return (
			<div>
				<DsButton className={styles.trigger} onClick={() => setOpen(true)}>
					Show Alert Banner
				</DsButton>
				<DsAlertBanner
					className={styles.inlineAlertBanner}
					open={open}
					onOpenChange={setOpen}
					inline={true}
					variant="warning"
					title="Attention needed"
					description="Aww yeah, you successfully read this important alert message. This example text is going to run a bit longer so that you can see how spacing within an alert works with this kind of content."
					closable={true}
					icon="warning"
				>
					<DsButton design="v1.2" variant="danger" size="small">
						Proceed
					</DsButton>
					<DsButton design="v1.2" buttonType="secondary" size="small">
						Skip
					</DsButton>
				</DsAlertBanner>
			</div>
		);
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);

		// Click the button to show the alert banner
		const showButton = canvas.getByText('Show Alert Banner');
		await userEvent.click(showButton);

		// Verify component renders correctly
		const component = canvas.getByText('Attention needed');
		await expect(component).toBeTruthy();

		// Test close button functionality
		const closeButton = canvas.getByLabelText('Close alert');
		await expect(closeButton).toBeTruthy();

		await userEvent.click(closeButton);
		await waitFor(() => {
			// The component should be hidden after clicking close
			expect(canvas.queryByText('Attention needed')).toBeFalsy();
		});
	},
};
