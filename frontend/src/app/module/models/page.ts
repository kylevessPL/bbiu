export class Page<T extends Page<T>> {
    content: T[];
    totalPages: number;
    totalElements: number;
    last: boolean;
    size: number;
    first: boolean;
    number: number;
    sort: string;
    empty: boolean;
    numberOfElements: number;
}
