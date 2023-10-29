import {Component, OnInit} from '@angular/core';
import {first} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';
import {GlobalService} from '../../service/global.service';
import {NoughtService} from '../../service/nought.service';
import {Nought} from '../../model/nought';
import {ListAccessors} from '../../model/list-accessors';
import {
    ConfirmationData,
    ConfirmationDialogComponent
} from '../../component/confirmation-dialog/confirmation-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {ErrorResponse} from '../../model/error-response';

@Component({
    selector: 'app-noughts',
    templateUrl: './noughts.component.html',
    styleUrls: ['./noughts.component.scss']
})
export class NoughtsComponent implements OnInit {
    data: Nought[];
    current: Nought;
    accessors: ListAccessors = {
        title: 'Noughts',
        icon: 'circle',
        identifier: 'id',
        primaryKey: 'name',
        secondaryKey: 'creationDate'
    };
    error: HttpErrorResponse;

    constructor(private dialog: MatDialog,
                private noughtService: NoughtService,
                private globalService: GlobalService) {
    }

    ngOnInit() {
        this.globalService.httpErrorStatus.subscribe(error => {
            this.error = error;
        });
        this.error = null;
        this.fetchData();
    }

    fetchData = () => this.noughtService.getAllNoughts()
        .pipe(first())
        .subscribe(noughts => this.data = noughts)

    switchCurrent = (nought: Nought = undefined) => {
        if (nought && !nought.color) {
            this.noughtService.getNought(nought.id)
                .pipe(first())
                .subscribe(res => this.switchCurrent(res));
        } else {
            this.current = nought;
        }
    }

    saveNought = (nought: Nought) => {
        if (!this.current) {
            this.createAndRefresh(nought);
        } else {
            this.updateAndRefresh(nought);
        }
    }

    deleteNought = () => {
        this.dialog.open(ConfirmationDialogComponent, {
            data: {
                title: 'Nought deletion',
                message: `Are you sure you want to delete ${this.current.name}?`,
                action: 'Yes',
                cancel: true
            } as ConfirmationData
        }).afterClosed()
            .pipe(first())
            .subscribe((res: boolean) => res && this.deleteAndRefresh());
    }

    private createAndRefresh = (nought: Nought) => {
        const onSuccess = (item: Nought) => {
            this.addDataItem(item);
            this.switchCurrent(item);
        };
        this.noughtService.createNought(nought)
            .pipe(first())
            .subscribe({
                next: res => res && this.handleOperationSuccess(res, 'created', onSuccess),
                error: (err: HttpErrorResponse) => err.status === 409 && this.handleCreationFailure(err.error)
            });
    }

    private updateAndRefresh = (nought: Nought) => {
        nought.id = nought.name = nought.creationDate = undefined;
        const onSuccess = (item: Nought) => this.switchCurrent(item);
        this.noughtService.updateNought(this.current.id, nought)
            .pipe(first())
            .subscribe({
                next: res => res && this.handleOperationSuccess(res, 'updated', onSuccess),
                error: (err: HttpErrorResponse) => err.status === 409 && this.handleUpdateFailure(err.error)
            });
    }

    private deleteAndRefresh = () => {
        const onSuccess = () => {
            this.removeDataItem();
            this.switchCurrent();
        };
        this.noughtService.deleteNought(this.current.id)
            .pipe(first())
            .subscribe(res => res?.ok && this.handleOperationSuccess(this.current, 'deleted', onSuccess));
    }

    private addDataItem = (nought: Nought) => {
        const item: Nought = {
            ...nought,
            comment: undefined,
            radius: undefined,
            color: undefined
        };
        this.data.push(item);
    }

    private removeDataItem = () => {
        this.data = this.data.filter(item => item.id !== this.current.id);
    }

    private handleOperationSuccess = (nought: Nought, operation: 'created' | 'updated' | 'deleted', onSuccess: (nought: Nought) => void) => {
        onSuccess(nought);
        this.globalService.showSuccessfulOperationNotification(nought.name, operation);
    }

    private handleCreationFailure = (error: ErrorResponse) => this.globalService.showFailedOperationNotification(error);

    private handleUpdateFailure = (error: ErrorResponse) => this.globalService.showFailedOperationDialog(error);
}
