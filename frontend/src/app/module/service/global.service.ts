import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({providedIn: 'root'})
export class GlobalService {
    public httpErrorStatus = new BehaviorSubject<any>(0);

    constructor(private snackBar: MatSnackBar) {
    }

    public showDataFetchErrorDialog = () => this.snackBar.open('Sorry probably something went wrong. Please try again later.',
        'Close',
        {
            duration: undefined
        });
}
