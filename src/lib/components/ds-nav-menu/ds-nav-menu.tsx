import classNames from 'classnames';
import { DsTypography } from '@design-system/ui';
import { DsNavMenuProps } from './ds-nav-menu.types';
import styles from './ds-nav-menu.module.scss';

/**
 * Design system nav menu component displays vertical navigation menu with count badges and states
 * Commonly used in sidebars, filter panels, settings, and multisection UIs
 */
const DsNavMenu = ({ items, selectedItem, onSelect, className }: DsNavMenuProps) => {
	return (
		<nav className={classNames(styles.navMenu, className)}>
			{items.map((item) => (
				<button
					key={item.id}
					className={classNames(styles.navItem, {
						[styles.selected]: item.id === selectedItem?.id,
					})}
					disabled={item.disabled}
					onClick={() => onSelect?.(item)}
					aria-current={item.id === selectedItem?.id ? 'true' : undefined}
				>
					<DsTypography variant="body-sm-md" className={styles.navItemLabel}>
						{item.label}
					</DsTypography>
					{item.count !== undefined && item.count > 0 && (
						<div className={styles.navItemCount}>
							<span className={styles.navItemDot} />
							<DsTypography variant="body-sm-reg" className={styles.navItemCountText}>
								{item.count}
							</DsTypography>
						</div>
					)}
				</button>
			))}
		</nav>
	);
};

export default DsNavMenu;
