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
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {CrossFormData, CrossFormDialogComponent} from '../../component/cross-form-dialog/cross-form-dialog.component';
import {ErrorResponse} from '../../model/error-response';

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

    constructor(private dialog: MatDialog,
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
        const dialog = this.dialog.open(CrossFormDialogComponent, {
            disableClose: true
        });
        const data = this.dataOperationEvent(dialog);
        data.subscribe(res => this.createAndRefresh(res, () => {
            dialog.close();
            data.unsubscribe();
        }));
    }

    editCross = (cross: Cross) => {
        const dialog = this.dialog.open(CrossFormDialogComponent, {
            data: {cross} as CrossFormData,
            disableClose: true
        });
        const data = this.dataOperationEvent(dialog);
        data.subscribe(res => this.updateAndRefresh(res, () => {
            dialog.close();
            data.unsubscribe();
        }));
    }

    deleteCross = (cross: Cross) => {
        this.dialog.open(ConfirmationDialogComponent, {
            data: {
                title: 'Cross deletion',
                message: `Are you sure you want to delete ${cross.name}?`,
                action: 'Yes',
                cancel: true
            } as ConfirmationData
        }).afterClosed()
            .pipe(first())
            .subscribe((res: boolean) => res && this.deleteAndRefresh(cross));
    }

    private createAndRefresh = (cross: Cross, onSuccess: () => void) => {
        this.crossService.createCross(cross)
            .pipe(first())
            .subscribe({
                next: res => res && this.handleOperationSuccess(res.name, 'created', onSuccess),
                error: (err: HttpErrorResponse) => err.status === 409 && this.handleOperationFailure(err.error)
            });
    }

    private updateAndRefresh = (cross: Cross, onSuccess: () => void) => {
        const id = cross.id;
        cross.id = cross.name = cross.creationDate = undefined;
        this.crossService.updateCross(id, cross)
            .pipe(first())
            .subscribe(res => res && this.handleOperationSuccess(res.name, 'updated', onSuccess));
    }

    private deleteAndRefresh = (cross: Cross) => {
        this.crossService.deleteCross(cross.id)
            .pipe(first())
            .subscribe(res => res?.ok && this.handleOperationSuccess(cross.name, 'deleted'));
    }

    private dataOperationEvent = (dialog: MatDialogRef<CrossFormDialogComponent, boolean>) => {
        dialog.afterClosed()
            .pipe(first())
            .subscribe(res => res && this.snackBar.dismiss());
        return dialog.componentInstance.export;
    }

    private handleOperationSuccess = (name: string, operation: 'created' | 'updated' | 'deleted', onSuccess: () => void = () => {
    }) => {
        onSuccess();
        this.forceRefresh.next();
        this.globalService.showSuccessfulOperationNotification(name, operation);
    }

    private handleOperationFailure = (error: ErrorResponse) => this.globalService.showFailedOperationNotification(error);
}
