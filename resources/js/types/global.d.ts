import type { RowData } from '@tanstack/react-table';
import type { route as routeFn } from 'ziggy-js';

declare global {
    const route: typeof routeFn;
}

declare module '@tanstack/react-table' {
    // Agar table.options.meta?.surahMap dikenali di seluruh app

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interface TableMeta<TData extends RowData> {
        surahMap?: Record<number, string>;
    }
}
