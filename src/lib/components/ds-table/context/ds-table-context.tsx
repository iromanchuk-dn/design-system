import { createContext, useContext } from 'react';
import { DsDataTableProps } from '@design-system/ui';

export interface DsTableContextType<TData, TValue> extends Partial<DsDataTableProps<TData, TValue>> {
	expandedRows: Record<string, boolean>;
	toggleRowExpanded: (rowId: string) => void;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const DsTableContext = createContext<DsTableContextType<any, any> | null>(null);

export const useDsTableContext = <TData, TValue>(): DsTableContextType<TData, TValue> => {
	const context = useContext(DsTableContext);
	if (!context) {
		throw new Error('useDsTableContext must be used within DsTable');
	}
	return context;
};
