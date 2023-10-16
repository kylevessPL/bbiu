import {Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild} from '@angular/core';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {Sort, SortDirection} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {HttpErrorResponse} from '@angular/common/http';
import {GlobalService} from '../../service/global.service';
import {TableColumn} from '../../models/table-column';
import {Page} from '../../models/page';
import {PageMeta} from '../../models/page-meta';
import {TableRowAction} from '../../models/table-row-action';

@Component({
    selector: 'app-data-table',
    templateUrl: './data-table.component.html',
    styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent<T extends Page<T>> implements OnInit, OnChanges {
    @Input() columns: TableColumn[];
    @Input() pageable = true;
    @Input() pageSize = 10;
    @Input() sortColumnDefault: string;
    @Input() sortDirectionDefault: SortDirection = 'asc';
    @Input() rowAction: TableRowAction = null;
    @Input() data: T;
    @Input() error: HttpErrorResponse;
    @Output() pageEvent = new EventEmitter<PageMeta>();
    @Output() rowActionEvent = new EventEmitter<T>();

    @ViewChild(MatPaginator, {read: true}) paginator: MatPaginator;

    hidden = true;
    rowActionColumnKey = 'action';
    columnKeys: string[];
    totalElements = 0;
    pageNumber = 0;
    dataSource = new MatTableDataSource<T>();
    sort: Sort = null;

    constructor(private globalService: GlobalService) {
    }

    ngOnInit() {
        this.columnKeys = this.columns.map(({columnDef}) => columnDef);
        if (this.rowAction) {
            this.columnKeys.push(this.rowActionColumnKey);
        }
    }

    ngOnChanges() {
        if (this.data) {
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
            sortDirection: this.sort ? this.sort.direction : this.sortDirectionDefault
        };
        this.pageNumber = meta.page;
        this.pageEvent.emit(meta);
    };

    sortData = (sort: Sort) => {
        this.hidden = true;
        this.pageNumber = 0;
        const meta: PageMeta = {
            page: 0,
            size: this.pageSize,
            sort: sort.active,
            sortDirection: sort.direction
        };
        this.sort = sort;
        this.pageEvent.emit(meta);
    };

    doRowAction = (item: T) => {
        this.rowActionEvent.emit(item);
    };

    private changeData = () => {
        this.dataSource = new MatTableDataSource<T>(this.data.content);
        this.dataSource.data = this.data.content;
        this.totalElements = this.data.totalElements;
        this.pageNumber = this.data.number;
        this.pageSize = this.data.size;
        this.dataSource.paginator = this.paginator;
        this.hidden = false;
    };
}
