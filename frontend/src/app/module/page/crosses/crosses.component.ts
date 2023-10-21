import {Component, OnInit} from '@angular/core';
import {first, Observable, Subject} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';
import {PageMeta} from '../../model/page-meta';
import {GlobalService} from '../../service/global.service';
import {Cross} from '../../model/cross';
import {CrossService} from '../../service/cross.service';
import {TableRowAction} from '../../model/table-row-action';
import {TableColumn} from '../../model/table-column';
import {Material} from "../../model/material.enum";
import {
    ConfirmationData,
    ConfirmationDialogComponent
} from "../../component/confirmation-dialog/confirmation-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";

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
    forceRefresh = new Subject<void>();
    error: HttpErrorResponse;

    constructor(
        private dialog: MatDialog,
        private snackBar: MatSnackBar,
        private crossService: CrossService,
        private globalService: GlobalService) {
    }

    ngOnInit = () => {
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

    createCross = () => {
        console.log('create');
    }

    editCross = (cross: Cross) => {
        console.log('edit');
    }

    deleteCross = (cross: Cross) => {
        this.confirmDeletion(cross)
            .pipe(first())
            .subscribe((res: boolean) => res && this.deleteAndRefresh(cross));
    }

    private deleteAndRefresh = (cross: Cross) => {
        this.crossService.deleteCross(cross.id)
            .pipe(first())
            .subscribe(res => {
                if (res?.ok) {
                    this.forceRefresh.next();
                    this.showDeletionNotification(cross.name);
                }
            });
    }

    private showDeletionNotification = (name: string) => {
        this.snackBar.open(`${name} has been deleted`, 'OK');
    }

    private confirmDeletion = (cross: Cross) => this.dialog.open(ConfirmationDialogComponent, {
        data: {
            title: 'Cross deletion',
            message: `Are you sure you want to delete ${cross.name}?`,
        } as ConfirmationData
    }).afterClosed()
}
