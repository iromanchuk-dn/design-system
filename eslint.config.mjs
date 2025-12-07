import baseConfig from '../../eslint.config.base.mjs';
import tseslint from 'typescript-eslint';

export default tseslint.config(
	...baseConfig,

	{
		ignores: ['**/*.stories.ts?(x)'],
		rules: {
			'no-console': 'error',
		},
	},
);
