import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ErrorResponse} from '../model/error-response';
import {MatDialog} from '@angular/material/dialog';
import {
    ConfirmationData,
    ConfirmationDialogComponent
} from '../component/confirmation-dialog/confirmation-dialog.component';
import DateUtils from '../util/date-utils';

@Injectable({providedIn: 'root'})
export class GlobalService {
    public httpErrorStatus = new BehaviorSubject<any>(0);

    constructor(private snackBar: MatSnackBar, private dialog: MatDialog) {
    }

    public showDataFetchErrorDialog = () => this.snackBar.open('Sorry probably something went wrong. Please try again later.',
        'Close',
        {
            duration: undefined
        })

    public showSuccessfulOperationNotification = (name: string, operation: 'created' | 'updated' | 'deleted') => {
        this.snackBar.open(`${name} has been ${operation}`, 'OK');
    }

    public showFailedOperationNotification = (error: ErrorResponse) => {
        this.snackBar.open(DateUtils.formatTimestampsInText(error.message), 'OK', {
            duration: 5000,
            panelClass: ['mat-toolbar', 'mat-warn']
        });
    }

    public showFailedOperationDialog = (error: ErrorResponse) => {
        this.dialog.open(ConfirmationDialogComponent, {
            data: {
                title: 'Failure',
                message: DateUtils.formatTimestampsInText(error.message),
                action: 'OK',
                cancel: false
            } as ConfirmationData
        });
    }
}
