import {TableColumnSearch} from './table-column-search';

export interface TableColumn {
    name: string;
    key: string;
    search?: TableColumnSearch;
}
