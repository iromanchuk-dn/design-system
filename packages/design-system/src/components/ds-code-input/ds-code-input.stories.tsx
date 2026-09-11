import type { Meta, StoryObj } from '@storybook/react-vite';
import { DsButtonV3 } from '../ds-button-v3';
import { DsTooltip } from '../ds-tooltip';
import { DsCodeInput } from './index';
import { codeInputSizes } from './ds-code-input.types';

const meta: Meta<typeof DsCodeInput> = {
	title: 'Components/CodeInput',
	component: DsCodeInput,
	parameters: { layout: 'padded' },
	argTypes: {
		size: { control: 'select', options: codeInputSizes },
		locale: { table: { disable: true } },
		slots: { table: { disable: true } },
		className: { table: { disable: true } },
		style: { table: { disable: true } },
		ref: { table: { disable: true } },
	},
};

export default meta;
type Story = StoryObj<typeof DsCodeInput>;

/**
 * Empty field. The trailing button opens a panel with a larger editing area and a
 * search box; both surfaces edit the same value.
 */
export const Default: Story = {
	args: {
		placeholder: 'Enter query',
	},
};

/**
 * A value long enough to outrun the single line. Expand to read and edit it in full.
 */
export const WithValue: Story = {
	args: {
		defaultValue:
			'Status = Active AND trigger = Scheduled\nAND site IN ("tel-aviv", "tokyo", "haifa")\nAND lastSeen > now() - 24h',
	},
};

/**
 * Open on mount. Type in the search box to highlight every occurrence — matching is
 * literal and case-insensitive, so `status` marks `Status` too.
 */
export const Expanded: Story = {
	args: {
		defaultExpanded: true,
		defaultValue:
			'Status = Active AND trigger = Scheduled\nAND site IN ("tel-aviv", "tokyo", "haifa")\nAND lastSeen > now() - 24h',
	},
};

/**
 * `small` and `large` change the field height; the code type scale stays fixed so
 * alignment inside the panel is unaffected.
 */
export const Small: Story = {
	args: {
		size: 'small',
		defaultValue: 'Status = Active AND trigger = Scheduled',
	},
};

export const Large: Story = {
	args: {
		size: 'large',
		defaultValue: 'Status = Active AND trigger = Scheduled',
	},
};

/**
 * Read-only still expands, so a long value stays searchable, but neither surface accepts
 * edits.
 */
export const ReadOnly: Story = {
	args: {
		readOnly: true,
		defaultValue: 'Status = Active AND trigger = Scheduled',
	},
};

/**
 * Disabled still expands, so a long value stays searchable, but neither surface accepts
 * edits.
 */
export const Disabled: Story = {
	args: {
		disabled: true,
		defaultValue: 'Status = Active\nAND trigger = Scheduled',
	},
};

/**
 * The component owns only the expand button. Anything else in the trailing slot — a
 * syntax-help tooltip, for instance — is passed by the consumer and renders after it.
 */
export const WithHelpAdornment: Story = {
	parameters: { docs: { source: { type: 'code' } } },
	render: () => (
		<DsCodeInput
			defaultValue="Status = Active AND trigger = Scheduled"
			slots={{
				endAdornment: (
					<DsTooltip content="Query syntax">
						<DsButtonV3 variant="tertiary" size="small" icon="help" aria-label="Query syntax" />
					</DsTooltip>
				),
			}}
		/>
	),
};
