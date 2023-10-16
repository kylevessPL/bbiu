import {SortDirection} from '@angular/material/sort';

export interface PageMeta {
    page: number,
    size: number,
    sort: string,
    sortDirection: SortDirection;
}

export const pageMetaDefault: PageMeta = {
    page: 0,
    size: 10,
    sort: 'id',
    sortDirection: 'asc'
};
