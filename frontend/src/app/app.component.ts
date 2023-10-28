import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import {
    ConfirmationData,
    ConfirmationDialogComponent
} from './module/component/confirmation-dialog/confirmation-dialog.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog} from '@angular/material/dialog';
import {environment} from '../environments/environment';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
    title = 'BBIU';
    mobileQuery: MediaQueryList;

    private readonly mobileQueryListener: () => void;

    constructor(changeDetectorRef: ChangeDetectorRef,
                media: MediaMatcher,
                private snackBar: MatSnackBar,
                private dialog: MatDialog) {
        this.mobileQuery = media.matchMedia('(max-width: 600px)');
        this.mobileQueryListener = () => changeDetectorRef.detectChanges();
    }

    ngOnInit() {
        this.mobileQuery.addEventListener('change', this.mobileQueryListener);
    }

    ngOnDestroy() {
        this.mobileQuery.removeEventListener('change', this.mobileQueryListener);
    }

    showCopyrightNotification() {
        this.snackBar.open(environment.copyrightMessage, 'OK');
    }

    showCopyrightDialog() {
        this.dialog.open(ConfirmationDialogComponent, {
            data: {
                title: 'Copyright notice',
                message: environment.copyrightMessage,
                action: 'OK',
                cancel: false
            } as ConfirmationData
        });
    }
}
