import React, { useState } from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import classNames from 'classnames';
import styles from '../ds-dropdown/ds-dropdown.module.scss';
import { DsIcon } from '../ds-icon';
import { DsDropdownMenuProps } from './ds-dropdown-menu.types';

/**
 * Design system DropdownMenu component (for action menus)
 */
const DsDropdownMenu: React.FC<DsDropdownMenuProps> = ({
	options,
	children,
	contentGap = 0,
	className,
	style,
	align = 'center',
	side = 'bottom',
	appendToBody = false,
}) => {
	const [open, setOpen] = useState(false);

	const dropdownContent = (
		<DropdownMenu.Content
			className={classNames(styles.content, styles.viewport)}
			sideOffset={contentGap}
			align={align}
			side={side}
		>
			{options.map((option, idx) => (
				<DropdownMenu.Item
					key={idx}
					disabled={option.disabled}
					className={classNames(styles.item, className)}
					style={style}
					onClick={() => {
						if (!option.disabled) {
							option.onClick?.();
							setOpen(false);
						}
					}}
				>
					{option.icon && <DsIcon icon={option.icon} className={styles.itemIcon} />}
					<span>{option.label}</span>
				</DropdownMenu.Item>
			))}
		</DropdownMenu.Content>
	);

	return (
		<DropdownMenu.Root open={open} onOpenChange={setOpen}>
			<DropdownMenu.Trigger asChild>{children}</DropdownMenu.Trigger>
			{appendToBody ? <DropdownMenu.Portal>{dropdownContent}</DropdownMenu.Portal> : dropdownContent}
		</DropdownMenu.Root>
	);
};

export default DsDropdownMenu;
