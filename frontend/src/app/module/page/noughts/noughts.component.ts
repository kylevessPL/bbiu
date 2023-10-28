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
        this.current = nought;
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
            } as ConfirmationData
        }).afterClosed()
            .pipe(first())
            .subscribe((res: boolean) => res && this.deleteAndRefresh());
    }

    private createAndRefresh = (nought: Nought) => {
        const onSuccess = () => {
            this.data.push(nought);
            this.switchCurrent(nought);
        };
        this.noughtService.createNought(nought)
            .pipe(first())
            .subscribe({
                next: res => res?.ok && this.handleOperationSuccess(nought.name, 'created', onSuccess),
                error: (err: HttpErrorResponse) => err.status === 409 && this.handleOperationFailure(err.error)
            });
    }

    private updateAndRefresh = (nought: Nought) => {
        nought.id = nought.name = nought.creationDate = undefined;
        const onSuccess = () => {
            const index = this.data.indexOf(this.current);
            this.data[index] = nought;
            this.switchCurrent(nought);
        };
        this.noughtService.updateNought(this.current.id, nought)
            .pipe(first())
            .subscribe(res => res?.ok && this.handleOperationSuccess(this.current.name, 'updated', onSuccess));
    }

    private deleteAndRefresh = () => {
        const onSuccess = () => {
            this.data = this.data.filter(item => item !== this.current);
            this.switchCurrent();
        };
        this.noughtService.deleteNought(this.current.id)
            .pipe(first())
            .subscribe(res => res?.ok && this.handleOperationSuccess(this.current.name, 'deleted', onSuccess));
    }

    private handleOperationSuccess = (name: string, operation: 'created' | 'updated' | 'deleted', onSuccess: () => void = () => {
    }) => {
        onSuccess();
        this.globalService.showSuccessfulOperationNotification(name, operation);
    }

    private handleOperationFailure = (error: ErrorResponse) => this.globalService.showFailedOperationNotification(error);
}
