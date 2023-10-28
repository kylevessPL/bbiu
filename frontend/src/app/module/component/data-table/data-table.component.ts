import {
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    Output,
    SimpleChange,
    ViewChild
} from '@angular/core';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {Sort, SortDirection} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {HttpErrorResponse} from '@angular/common/http';
import {GlobalService} from '../../service/global.service';
import {TableColumn} from '../../model/table-column';
import {Page} from '../../model/page';
import {PageMeta} from '../../model/page-meta';
import {TableRowAction} from '../../model/table-row-action';
import {Observable, Subscription, timer} from 'rxjs';
import {environment} from '../../../../environments/environment';

@Component({
    selector: 'app-data-table',
    templateUrl: './data-table.component.html',
    styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent<T extends Page<T>> implements OnInit, OnDestroy, OnChanges {
    @Input() columns: TableColumn[];
    @Input() pageSize = 10;
    @Input() sortColumnDefault: string;
    @Input() sortDirectionDefault: SortDirection = 'asc';
    @Input() rowActions: TableRowAction<T>[] = [];
    @Input() data: T;
    @Input() filter: Record<string, any>;
    @Input() forceRefresh: Observable<void>;
    @Input() error: HttpErrorResponse;
    @Output() pageEvent = new EventEmitter<PageMeta>();

    @ViewChild(MatPaginator, {read: true}) paginator: MatPaginator;

    hidden = true;
    rowIndexColumnKey = 'index';
    rowActionColumnKey = 'action';
    columnKeys = [this.rowIndexColumnKey];
    totalElements = 0;
    pageNumber = 0;
    dataSource = new MatTableDataSource<T>();
    sort: Sort = null;

    private forceRefreshSubscription: Subscription;
    protected readonly environment = environment;

    constructor(private globalService: GlobalService) {
    }

    ngOnInit() {
        this.columnKeys = this.columnKeys.concat(this.columns.map(({key}) => key));
        if (this.rowActions.length > 0) {
            this.columnKeys.push(this.rowActionColumnKey);
        }
        this.forceRefreshSubscription = this.forceRefresh.subscribe(() => this.fetchData());
    }

    ngOnDestroy() {
        this.forceRefreshSubscription.unsubscribe();
    }

    ngOnChanges(changes: { [propName: string]: SimpleChange }) {
        if (this.filterChanged(changes.filter)) {
            timer(0).subscribe(() => this.fetchData());
        } else if (this.data) {
            this.changeData();
        } else if (this.error && this.error.status !== 200) {
            this.globalService.showDataFetchErrorDialog();
            this.data = null;
            this.changeData();
        }
    }

    fetchData = (event: PageEvent = null) => {
        this.hidden = true;
        const meta: PageMeta = {
            page: event ? event.pageIndex : 0,
            size: event ? event.pageSize : this.pageSize,
            sort: this.sort ? this.sort.active : this.sortColumnDefault,
            filter: this.filter,
            sortDirection: this.sort ? this.sort.direction : this.sortDirectionDefault
        };
        this.pageNumber = meta.page;
        this.pageEvent.emit(meta);
    }

    sortData = (sort: Sort) => {
        this.hidden = true;
        this.pageNumber = 0;
        const meta: PageMeta = {
            page: 0,
            size: this.pageSize,
            sort: sort.active,
            filter: this.filter,
            sortDirection: sort.direction
        };
        this.sort = sort;
        this.pageEvent.emit(meta);
    }

    private filterChanged = (filter?: Record<string, any>) =>
        filter && JSON.stringify(filter.previousValue) !== JSON.stringify(filter.currentValue)

    private changeData = () => {
        this.dataSource = new MatTableDataSource<T>(this.data.content);
        this.dataSource.data = this.data.content;
        this.totalElements = this.data.totalElements;
        this.pageNumber = this.data.number;
        this.pageSize = this.data.size;
        this.dataSource.paginator = this.paginator;
        this.hidden = false;
    }
}
