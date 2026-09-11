import { type ChangeEvent, Fragment, useState } from 'react';
import { useHighlight } from '@ark-ui/react/highlight';
import { DsIcon } from '../../ds-icon';
import { DsTextInput } from '../../ds-text-input';
import styles from './ds-code-input-panel.module.scss';

export interface DsCodeInputPanelProps {
	value: string;
	readOnly: boolean;
	searchPlaceholder: string;
	codeLabel: string;
	onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
}

/**
 * Panel body: a search field over an editable code surface.
 *
 * The surface is two layers — a backdrop that paints the match highlights and a
 * transparent-background textarea that paints the real, selectable text on top. Only the
 * backdrop is in normal flow, so it sizes the stack and the textarea stretches to match;
 * the shared ancestor is the sole scroll container, which is why the two can never drift
 * out of alignment and why no scroll syncing is needed.
 */
const DsCodeInputPanel = ({
	value,
	readOnly,
	searchPlaceholder,
	codeLabel,
	onChange,
}: DsCodeInputPanelProps) => {
	const [query, setQuery] = useState('');

	const chunks = useHighlight({ text: value, query, ignoreCase: true, matchAll: true });

	return (
		<>
			<label className={styles.searchRow}>
				<span className={styles.visuallyHidden}>{searchPlaceholder}</span>
				<DsTextInput
					value={query}
					placeholder={searchPlaceholder}
					onValueChange={setQuery}
					// The icon sits inside the label, so hide it or its ligature text joins the
					// field's accessible name.
					slots={{ startAdornment: <DsIcon icon="search" size="tiny" aria-hidden /> }}
				/>
			</label>

			<div className={styles.codeScroll}>
				<div className={styles.codeStack}>
					<div className={styles.backdrop} aria-hidden="true">
						{chunks.map((chunk, index) =>
							chunk.match ? (
								// Chunks are positional slices of one string, so the index is their identity.
								<mark key={index} className={styles.mark}>
									{chunk.text}
								</mark>
							) : (
								<Fragment key={index}>{chunk.text}</Fragment>
							),
						)}
						{/*
						 * `white-space: pre-wrap` drops a single trailing newline but a textarea
						 * renders it as a line, so mirror one unconditionally: it reconciles the
						 * empty, no-trailing-newline and trailing-newline cases alike.
						 */}
						{'\n'}
					</div>

					<textarea
						className={styles.codeArea}
						aria-label={codeLabel}
						value={value}
						readOnly={readOnly}
						spellCheck={false}
						autoComplete="off"
						onChange={onChange}
					/>
				</div>
			</div>
		</>
	);
};

export default DsCodeInputPanel;
