import {Component, OnInit} from '@angular/core';
import {first, Observable, Subject} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';
import {PageMeta} from '../../model/page-meta';
import {GlobalService} from '../../service/global.service';
import {Cross} from '../../model/cross';
import {CrossService} from '../../service/cross.service';
import {TableRowAction} from '../../model/table-row-action';
import {TableColumn} from '../../model/table-column';
import {Material} from '../../model/material.enum';
import {
    ConfirmationData,
    ConfirmationDialogComponent
} from '../../component/confirmation-dialog/confirmation-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {CrossFormData, CrossFormDialogComponent} from '../../component/cross-form/cross-form-dialog.component';
import {ErrorResponse} from "../../model/error-response";

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
            name: 'Creation date',
            key: 'creationDate'
        },
        {
            name: 'Expiry date',
            key: 'expiryDate'
        },
        {
            name: 'Expired',
            key: 'expired'
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

    createCross = () => {
        this.performCreation()
            .pipe(first())
            .subscribe((res: Cross) => res && this.createAndRefresh(res));
    }

    editCross = (cross: Cross) => {
        this.performEdition(cross)
            .pipe(first())
            .subscribe((res: Cross) => res && this.updateAndRefresh(res));
    }

    deleteCross = (cross: Cross) => {
        this.confirmDeletion(cross)
            .pipe(first())
            .subscribe((res: boolean) => res && this.deleteAndRefresh(cross));
    }

    private performCreation = () => this.dialog.open(CrossFormDialogComponent, {
        disableClose: true
    }).afterClosed()

    private performEdition = (cross: Cross) => this.dialog.open(CrossFormDialogComponent, {
        data: {
            cross,
            edit: true
        } as CrossFormData,
        disableClose: true
    }).afterClosed()

    private confirmDeletion = (cross: Cross) => this.dialog.open(ConfirmationDialogComponent, {
        data: {
            title: 'Cross deletion',
            message: `Are you sure you want to delete ${cross.name}?`,
        } as ConfirmationData
    }).afterClosed()

    private createAndRefresh = (cross: Cross) => {
        this.crossService.createCross(cross)
            .pipe(first())
            .subscribe({
                next: res => res?.ok && this.handleOperationSuccess(cross.name, 'created'),
                error: (err: HttpErrorResponse) => err.status === 409 && this.handleOperationConflict(err.error)
            });
    }

    private updateAndRefresh = (cross: Cross) => {
        const {id, name} = cross;
        cross.id = cross.name = cross.creationDate = undefined;
        this.crossService.updateCross(id, cross)
            .pipe(first())
            .subscribe({
                next: res => res?.ok && this.handleOperationSuccess(name, 'updated'),
                error: (err: HttpErrorResponse) => err.status === 409 && this.handleOperationConflict(err.error)
            });
    }

    private deleteAndRefresh = (cross: Cross) => {
        this.crossService.deleteCross(cross.id)
            .pipe(first())
            .subscribe(res => res?.ok && this.handleOperationSuccess(cross.name, 'deleted'));
    }

    private handleOperationSuccess(name: string, operation: 'created' | 'updated' | 'deleted') {
        this.forceRefresh.next();
        this.showOperationNotification(name, operation);
    }

    private handleOperationConflict(error: ErrorResponse) {
        this.snackBar.open(error.message, 'OK', {duration: 5000});
    }

    private showOperationNotification = (name: string, operation: 'created' | 'updated' | 'deleted') => {
        this.snackBar.open(`${name} has been ${operation}`, 'OK');
    }
}
