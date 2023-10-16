import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
    selector: 'app-message-dialog',
    templateUrl: './message-dialog.component.html',
    styleUrls: ['./message-dialog.component.scss']
})
export class MessageDialogComponent {
    constructor(@Inject(MAT_DIALOG_DATA) public data: MessageDialogData) {
        this.confirmButton = data.confirmButton ?? true;
    }

    public confirmButton;
}

export interface MessageDialogData {
    title: string;
    message: string;
    confirmButton?: boolean;
}
