import {SortDirection} from '@angular/material/sort';

export interface PageMeta {
    page: number;
    size: number;
    sort: string;
    filter?: Record<string, any>;
    sortDirection: SortDirection;
}

export const pageMetaDefault: PageMeta = {
    page: 0,
    size: 5,
    sort: 'id',
    sortDirection: 'asc'
};
