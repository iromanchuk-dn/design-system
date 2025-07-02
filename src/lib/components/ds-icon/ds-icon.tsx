import React from 'react';
import classNames from 'classnames';
import styles from './ds-icon.module.scss';
import { DsIconProps } from './ds-icon.types';
import { materialIcons } from './material-icons';

/**
 * Design system Icon component that renders Google Material Icons or inline SVGs
 */
const DsIcon: React.FC<DsIconProps> = ({
	icon,
	size = 'medium',
	variant = 'filled',
	className = '',
	style = {},
	onClick,
	...rest
}) => {
	// Check if this is a Material Symbols icon (when no regular icon exists)
	const isSymbolsIcon =
		typeof icon === 'string' &&
		materialIcons[`symbols::${icon}` as keyof typeof materialIcons] &&
		!Object.keys(materialIcons).some((key) => !key.startsWith('symbols::') && key.endsWith(`::${icon}`));

	const variantClass = isSymbolsIcon
		? 'material-symbols-outlined'
		: variant !== 'filled'
			? `material-icons-${variant}`
			: 'material-icons';

	const iconClass = classNames(styles.icon, styles[size], className);

	if (typeof icon === 'function') {
		const SvgComponent = icon;
		return <SvgComponent className={iconClass} style={style} onClick={onClick} {...rest} />;
	}

	return (
		<span className={classNames(iconClass, variantClass)} style={style} onClick={onClick} {...rest}>
			{icon}
		</span>
	);
};

export default DsIcon;
