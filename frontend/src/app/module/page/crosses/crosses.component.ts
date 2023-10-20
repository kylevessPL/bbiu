import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';
import {PageMeta} from '../../model/page-meta';
import {GlobalService} from '../../service/global.service';
import {Cross} from '../../model/cross';
import {CrossService} from '../../service/cross.service';
import {TableRowAction} from '../../model/table-row-action';
import {TableColumn} from '../../model/table-column';
import {Material} from "../../model/material.enum";

@Component({
    selector: 'app-crosses',
    templateUrl: './crosses.component.html',
    styleUrls: ['./crosses.component.scss']
})
export class CrossesComponent implements OnInit {
    columns: TableColumn[] = [
        {
            name: 'Id',
            key: 'id',
            search: {
                type: 'number'
            }
        },
        {
            name: 'Name',
            key: 'name',
            search: {
                type: 'string'
            }
        },
        {
            name: 'Angle',
            key: 'angle',
            search: {
                type: 'number'
            }
        },
        {
            name: 'Weight',
            key: 'weight',
            search: {
                type: 'number'
            }
        },
        {
            name: 'Beams',
            key: 'beams',
            search: {
                type: 'number'
            }
        },
        {
            name: 'Material',
            key: 'material',
            search: {
                type: 'constant'
            }
        },
        {
            name: 'Expiry date',
            key: 'expiryDate'
        },
        {
            name: 'Comment',
            key: 'comment',
            search: {
                type: 'string'
            }
        }
    ];
    rowActions: TableRowAction<Cross>[] = [
        {
            description: 'Edit',
            icon: 'edit',
            color: 'accent',
            action: (cross: Cross) => this.editCross(cross)
        },
        {
            description: 'Delete',
            icon: 'delete',
            color: 'warn',
            action: (cross: Cross) => this.deleteCross(cross)
        }
    ];
    data: Observable<Cross>;
    filter: Record<string, any> = {
        material: Object.keys(Material)
    };
    error: HttpErrorResponse;

    constructor(private crossService: CrossService, private globalService: GlobalService) {
    }

    ngOnInit() {
        this.globalService.httpErrorStatus.subscribe(error => {
            this.error = error;
        });
        this.error = null;
        this.fetchData();
    }

    fetchData = (pageMeta?: PageMeta) => {
        this.data = this.crossService.getAllCrosses(pageMeta);
    }

    applyFilter = (filter: Record<string, any>) => {
        this.filter = filter;
    }

    addCross = () => {
        console.log('add');
    }

    editCross = (cross: Cross) => {
        console.log('edit');
    }

    deleteCross = (cross: Cross) => {
        console.log('delete');
    }
}
