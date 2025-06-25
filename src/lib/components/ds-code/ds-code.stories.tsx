import type { Meta, StoryObj } from '@storybook/react';
import DsCode from './ds-code';
import { codeSizes, codeVariants, codeWeights } from './ds-code.types';
import styles from './ds-code.stories.module.scss';

const meta: Meta<typeof DsCode> = {
	title: 'Design System/Code',
	component: DsCode,
	parameters: {
		layout: 'padded',
	},
	tags: ['autodocs'],
	argTypes: {
		variant: {
			control: { type: 'select' },
			options: codeVariants,
			description: 'Display variant for the code',
		},
		size: {
			control: { type: 'select' },
			options: codeSizes,
			description: 'Size of the code text',
		},
		weight: {
			control: { type: 'select' },
			options: codeWeights,
			description: 'Weight of the code text',
		},
		children: {
			control: 'text',
			description: 'The code content to display',
		},
	},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => {
		const codeClasses = [
			{
				name: 'Small Regular Inline',
				variant: 'inline' as const,
				size: 'sm' as const,
				weight: 'reg' as const,
				description: '14px, Regular, -0.01em letter spacing, Fira Mono',
				code: 'const user = { name: "John", age: 30 };',
			},
			{
				name: 'Small Semi-bold Inline',
				variant: 'inline' as const,
				size: 'sm' as const,
				weight: 'semi-bold' as const,
				description: '14px, Semi-bold, -0.01em letter spacing, Fira Mono',
				code: 'npm install @design-system/ui',
			},
			{
				name: 'Extra Small Regular Inline',
				variant: 'inline' as const,
				size: 'xs' as const,
				weight: 'reg' as const,
				description: '12px, Regular, -0.01em letter spacing, Fira Mono',
				code: 'git commit -m "feat: update typography"',
			},
			{
				name: 'Extra Small Semi-bold Inline',
				variant: 'inline' as const,
				size: 'xs' as const,
				weight: 'semi-bold' as const,
				description: '12px, Semi-bold, -0.01em letter spacing, Fira Mono',
				code: 'docker build -t my-app .',
			},
		];

		const blockCodeExamples = [
			{
				name: 'Small Regular Block',
				variant: 'block' as const,
				size: 'sm' as const,
				weight: 'reg' as const,
				description: '14px, Regular, -0.01em letter spacing, Fira Mono',
				code: `function greet(name: string): string {
  return \`Hello, \${name}!\`;
}

const message = greet("World");
console.log(message);`,
			},
			{
				name: 'Small Semi-bold Block',
				variant: 'block' as const,
				size: 'sm' as const,
				weight: 'semi-bold' as const,
				description: '14px, Semi-bold, -0.01em letter spacing, Fira Mono',
				code: `// React component example
import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = 'primary'
}) => {
  return (
    <button
      className={\`btn btn-\${variant}\`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};`,
			},
			{
				name: 'Extra Small Regular Block',
				variant: 'block' as const,
				size: 'xs' as const,
				weight: 'reg' as const,
				description: '12px, Regular, -0.01em letter spacing, Fira Mono',
				code: `interface Config {
  apiUrl: string;
  timeout: number;
  retries: number;
}

const config: Config = {
  apiUrl: "https://api.example.com",
  timeout: 5000,
  retries: 3
};`,
			},
			{
				name: 'Extra Small Semi-bold Block',
				variant: 'block' as const,
				size: 'xs' as const,
				weight: 'semi-bold' as const,
				description: '12px, Semi-bold, -0.01em letter spacing, Fira Mono',
				code: `// TypeScript interface example
interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'guest';
  createdAt: Date;
  updatedAt: Date;
}

// API response type
type ApiResponse<T> = {
  data: T;
  status: 'success' | 'error';
  message?: string;
  timestamp: string;
};`,
			},
		];

		return (
			<div className={styles.codeContainer}>
				<h1 className={styles.pageTitle}>Code Design System v1.2</h1>
				<p className={styles.pageDescription}>
					This showcase displays all code typography classes defined in the Design System v1.2.
				</p>

				<div className={styles.codeGrid}>
					{codeClasses.map((codeClass) => (
						<div
							key={`${codeClass.size}-${codeClass.weight}-${codeClass.variant}`}
							className={styles.codeItem}
						>
							<div className={styles.codeInfo}>
								<h3 className={styles.codeName}>{codeClass.name}</h3>
								<p className={styles.codeDescription}>{codeClass.description}</p>
								<code className={styles.codeClass}>
									.{codeClass.size}-{codeClass.weight} ({codeClass.variant})
								</code>
							</div>
							<div className={styles.codePreview}>
								<DsCode variant={codeClass.variant} size={codeClass.size} weight={codeClass.weight}>
									{codeClass.code}
								</DsCode>
							</div>
						</div>
					))}
				</div>

				<div className={styles.codeGrid}>
					{blockCodeExamples.map((codeClass) => (
						<div
							key={`${codeClass.size}-${codeClass.weight}-${codeClass.variant}`}
							className={styles.codeItem}
						>
							<div className={styles.codeInfo}>
								<h3 className={styles.codeName}>{codeClass.name}</h3>
								<p className={styles.codeDescription}>{codeClass.description}</p>
								<code className={styles.codeClass}>
									.{codeClass.size}-{codeClass.weight} ({codeClass.variant})
								</code>
							</div>
							<div className={styles.codePreview}>
								<DsCode variant={codeClass.variant} size={codeClass.size} weight={codeClass.weight}>
									{codeClass.code}
								</DsCode>
							</div>
						</div>
					))}
				</div>
			</div>
		);
	},
};
