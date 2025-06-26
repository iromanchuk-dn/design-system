import * as Collapsible from '@radix-ui/react-collapsible';

type Variant = 'collapsed' | 'minimized';

export type DsPanelProps = Collapsible.CollapsibleProps & {
	variant?: Variant;
};

export type Context = {
	variant: Variant;
	open?: boolean;
};
