import {Component, EventEmitter, Input, OnChanges, Output, ViewChild} from '@angular/core';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {HttpErrorResponse} from '@angular/common/http';
import {GlobalService} from '../../service/global.service';
import {PageMeta} from '../../models/page-meta';
import {Product} from '../../models/product';

@Component({
    selector: 'app-noughts-list',
    templateUrl: './noughts-list.component.html',
    styleUrls: ['./noughts-list.component.scss']
})
export class NoughtsListComponent implements OnChanges {
    @Input() data: Product;
    @Input() error: HttpErrorResponse;
    @Output() pageEvent = new EventEmitter<PageMeta>();

    @ViewChild(MatPaginator, {read: true}) paginator: MatPaginator;

    hidden = true;
    totalElements = 0;
    pageNumber = 0;
    pageSize = 5;
    dataSource: Product[];

    constructor(private globalService: GlobalService) {
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

    fetchData = (event: PageEvent) => {
        this.hidden = true;
        const meta: PageMeta = {
            page: event.pageIndex,
            size: event.pageSize,
            sort: 'id',
            sortDirection: 'asc'
        };
        this.pageNumber = meta.page;
        this.pageEvent.emit(meta);
    };

    private changeData = () => {
        this.dataSource = this.data.content;
        this.totalElements = this.data.totalElements;
        this.pageNumber = this.data.number;
        this.pageSize = this.data.size;
        this.hidden = false;
    };
}
