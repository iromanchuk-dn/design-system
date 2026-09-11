import { describe, expect, it, vi } from 'vitest';
import { page, userEvent } from 'vitest/browser';
import { DsCodeInput } from '../index';

const query = 'Status = Active AND status = Scheduled';
const multiline = 'SELECT *\nFROM devices';

const getField = () => page.getByPlaceholder('Enter a query');
const getExpand = () => page.getByRole('button', { name: 'Expand' });
const getCollapse = () => page.getByRole('button', { name: 'Collapse' });
const getCodeArea = () => page.getByRole('textbox', { name: 'Code' });
const getSearch = () => page.getByRole('textbox', { name: 'Search in query' });

// A closed popover keeps its content mounted but `hidden`, which takes it out of the
// accessibility tree — so absence from a role query is what "closed" looks like here.
const expectPanelClosed = async () => {
	await expect.poll(() => getCodeArea().query()).toBeNull();
};

const fieldNode = () => document.querySelector<HTMLTextAreaElement>('textarea[placeholder="Enter a query"]');
const panelNode = () => document.querySelector<HTMLElement>('[role="dialog"]');

// Geometry parity between the two layers is the contract that makes the highlight
// technique work, so these two reach for the nodes directly.
const codeAreaNode = () => document.querySelector<HTMLTextAreaElement>('[role="dialog"] textarea');
const backdropNode = () => codeAreaNode()?.previousElementSibling as HTMLElement | undefined;

describe('DsCodeInput', () => {
	it('renders the value in the collapsed field', async () => {
		await page.render(<DsCodeInput placeholder="Enter a query" defaultValue={query} />);

		await expect.element(getField()).toHaveValue(query);
	});

	it('keeps newlines in the collapsed field instead of silently joining the lines', async () => {
		const onValueChange = vi.fn();
		await page.render(
			<DsCodeInput placeholder="Enter a query" defaultValue={multiline} onValueChange={onValueChange} />,
		);

		await expect.element(getField()).toHaveValue(multiline);

		await getField().click();
		await userEvent.keyboard('{End}X');

		expect(onValueChange).toHaveBeenLastCalledWith(expect.stringContaining('\n'));
	});

	it('opens the panel from the toggle and flips it to collapse', async () => {
		await page.render(<DsCodeInput placeholder="Enter a query" defaultValue={query} />);

		await expectPanelClosed();

		await getExpand().click();

		await expect.element(getCodeArea()).toBeVisible();
		await expect.element(getCollapse()).toBeVisible();
	});

	it('opens the panel when Enter is pressed in the collapsed field', async () => {
		await page.render(<DsCodeInput placeholder="Enter a query" defaultValue={query} />);

		await getField().click();
		await userEvent.keyboard('{Enter}');

		await expect.element(getCodeArea()).toBeVisible();
	});

	it('reports edits made in the collapsed field', async () => {
		const onValueChange = vi.fn();
		await page.render(<DsCodeInput placeholder="Enter a query" onValueChange={onValueChange} />);

		await getField().fill('a');

		expect(onValueChange).toHaveBeenLastCalledWith('a');
	});

	it('shares one value between the collapsed field and the panel', async () => {
		const onValueChange = vi.fn();
		await page.render(
			<DsCodeInput placeholder="Enter a query" defaultValue={query} onValueChange={onValueChange} />,
		);

		await getExpand().click();
		await getCodeArea().fill(`${query} extra`);

		expect(onValueChange).toHaveBeenLastCalledWith(`${query} extra`);
		await expect.element(getField()).toHaveValue(`${query} extra`);
	});

	it('marks every occurrence of the search query, ignoring case', async () => {
		await page.render(<DsCodeInput placeholder="Enter a query" defaultValue={query} defaultExpanded />);

		await getSearch().fill('status');

		expect(document.querySelectorAll('mark')).toHaveLength(2);
	});

	it('renders no marks for an empty search query', async () => {
		await page.render(<DsCodeInput placeholder="Enter a query" defaultValue={query} defaultExpanded />);

		expect(document.querySelectorAll('mark')).toHaveLength(0);
	});

	it('treats regular expression metacharacters in the search query literally', async () => {
		await page.render(<DsCodeInput placeholder="Enter a query" defaultValue="a.c and abc" defaultExpanded />);

		await getSearch().fill('.');

		expect(document.querySelectorAll('mark')).toHaveLength(1);
	});

	it('clears the search query when the panel is reopened', async () => {
		await page.render(<DsCodeInput placeholder="Enter a query" defaultValue={query} />);

		await getExpand().click();
		await getSearch().fill('status');
		expect(document.querySelectorAll('mark')).toHaveLength(2);

		await getCollapse().click();
		await getExpand().click();

		await expect.element(getSearch()).toHaveValue('');
		expect(document.querySelectorAll('mark')).toHaveLength(0);
	});

	it('keeps the highlight backdrop the same height as the editor for a trailing newline', async () => {
		await page.render(<DsCodeInput placeholder="Enter a query" defaultValue={'a\n'} defaultExpanded />);
		await expect.element(getCodeArea()).toBeVisible();

		expect(backdropNode()?.offsetHeight).toBe(codeAreaNode()?.offsetHeight);
	});

	it('keeps the highlight backdrop the same height as the editor for a wrapped token', async () => {
		await page.render(
			<DsCodeInput placeholder="Enter a query" defaultValue={'x'.repeat(400)} defaultExpanded />,
		);
		await expect.element(getCodeArea()).toBeVisible();

		expect(backdropNode()?.offsetHeight).toBe(codeAreaNode()?.offsetHeight);
	});

	it('sizes the panel to the width of the field', async () => {
		await page.render(
			<div style={{ width: 420 }}>
				<DsCodeInput placeholder="Enter a query" defaultValue={query} />
			</div>,
		);

		await getExpand().click();
		await expect.element(getCodeArea()).toBeVisible();

		const field = fieldNode()?.closest('div')?.parentElement;
		expect(panelNode()?.offsetWidth).toBe(field?.offsetWidth);
	});

	it('closes the panel on Escape and reports the change', async () => {
		const onExpandChange = vi.fn();
		await page.render(
			<DsCodeInput placeholder="Enter a query" defaultValue={query} onExpandChange={onExpandChange} />,
		);

		await getExpand().click();
		expect(onExpandChange).toHaveBeenLastCalledWith(true);

		await userEvent.keyboard('{Escape}');

		await expectPanelClosed();
		expect(onExpandChange).toHaveBeenLastCalledWith(false);
	});

	it('still opens the panel when disabled, with a disabled editor', async () => {
		await page.render(<DsCodeInput placeholder="Enter a query" defaultValue={query} disabled />);

		await expect.element(getExpand()).toBeEnabled();
		await expect.element(getField()).toBeDisabled();

		await getExpand().click();

		await expect.element(getCodeArea()).toBeVisible();
		await expect.element(getCodeArea()).toBeDisabled();

		await getSearch().fill('status');
		expect(document.querySelectorAll('mark')).toHaveLength(2);
	});

	it('still opens the panel when read only, with a read-only editor', async () => {
		await page.render(<DsCodeInput placeholder="Enter a query" defaultValue={query} readOnly />);

		await getExpand().click();

		await expect.element(getCodeArea()).toBeVisible();
		await expect.element(getCodeArea()).toHaveAttribute('readonly');
	});

	it('honours a controlled expanded prop', async () => {
		const onExpandChange = vi.fn();
		await page.render(
			<DsCodeInput
				placeholder="Enter a query"
				defaultValue={query}
				expanded={false}
				onExpandChange={onExpandChange}
			/>,
		);

		await getExpand().click();

		expect(onExpandChange).toHaveBeenLastCalledWith(true);
		await expectPanelClosed();
	});
});
