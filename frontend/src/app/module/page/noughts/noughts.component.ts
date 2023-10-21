import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';
import {PageMeta} from '../../model/page-meta';
import {GlobalService} from '../../service/global.service';
import {NoughtService} from '../../service/nought.service';

@Component({
    selector: 'app-noughts',
    templateUrl: './noughts.component.html',
    styleUrls: ['./noughts.component.scss']
})
export class NoughtsComponent implements OnInit {
    data: Observable<any>;
    pageMeta: PageMeta = {
        page: 0,
        size: 5,
        sort: 'id',
        sortDirection: 'asc'
    };
    error: HttpErrorResponse;

    constructor(private productService: NoughtService, private globalService: GlobalService) {
    }

    ngOnInit() {
        this.globalService.httpErrorStatus.subscribe(error => {
            this.error = error;
        });
        this.error = null;
        this.fetchData(this.pageMeta);
    }

    fetchData = (pageMeta: PageMeta) => {
        this.pageMeta = pageMeta;
        this.data = this.productService.getAllNoughts(pageMeta);
    }
}
