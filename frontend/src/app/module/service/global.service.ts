import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ErrorResponse} from '../model/error-response';

@Injectable({providedIn: 'root'})
export class GlobalService {
    public httpErrorStatus = new BehaviorSubject<any>(0);

    constructor(private snackBar: MatSnackBar) {
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
        this.snackBar.open(error.message, 'OK', {
            duration: 5000,
            panelClass: ['mat-toolbar', 'mat-warn']
        });
    }
}
