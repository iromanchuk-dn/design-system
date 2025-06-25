import React from 'react';
import classNames from 'classnames';
import styles from './ds-code.module.scss';
import { DsCodeProps } from './ds-code.types';

/**
 * Design system Code component for displaying code snippets
 */
const DsCode: React.FC<DsCodeProps> = ({
	variant = 'inline',
	size = 'sm',
	weight = 'reg',
	className,
	children,
	...props
}) => {
	const codeClass = classNames(styles.code, styles[variant], styles[`${size}-${weight}`], className);

	if (variant === 'block') {
		return (
			<pre className={codeClass} {...props}>
				<code>{children}</code>
			</pre>
		);
	}

	return (
		<code className={codeClass} {...props}>
			{children}
		</code>
	);
};

export default DsCode;
