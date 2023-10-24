import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Material} from '../../model/material.enum';
import {Cross} from '../../model/cross';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import Utils from '../../util/utils';
import {DateFormatterPipe} from '../../pipe/date-formatter.pipe';

@Component({
    selector: 'app-cross-form-dialog',
    templateUrl: './cross-form-dialog.component.html',
    styleUrls: ['./cross-form-dialog.component.scss'],
    providers: [DateFormatterPipe]
})
export class CrossFormDialogComponent implements OnInit {

    constructor(@Inject(MAT_DIALOG_DATA) public data: CrossFormData,
                private dialogRef: MatDialogRef<CrossFormDialogComponent>,
                private dateFormatter: DateFormatterPipe,
                private fb: FormBuilder) {
    }

    edit: boolean;
    form: FormGroup;
    material = Material;
    materialKeys = Object.keys(this.material);
    dateNow = new Date();

    protected readonly nameMaxLength = 30;
    protected readonly commentMaxLength = 128;
    protected readonly angleMin = 0;
    protected readonly angleMax = 45;
    protected readonly weightMin = 1;
    protected readonly weightMax = 10;
    protected readonly beamsMin = 1;

    ngOnInit() {
        const {
            id, name, angle, weight, beams,
            material, creationDate, expiryDate, comment
        } = this.data.cross;
        this.edit = this.data.edit ?? false;
        this.form = this.fb.group({
            id: new FormControl({value: id, disabled: true}),
            name: new FormControl(
                {value: name, disabled: this.edit},
                [Validators.required, Validators.maxLength(this.nameMaxLength)]
            ),
            creationDate: new FormControl({value: this.dateFormatter.transform(creationDate), disabled: true}),
            expiryDate,
            comment: [comment, Validators.maxLength(this.commentMaxLength)],
            angle: [angle, [Validators.required, Validators.min(this.angleMin), Validators.max(this.angleMax)]],
            weight: [weight, [Validators.required, Validators.min(this.weightMin), Validators.max(this.weightMax)]],
            beams: [beams, [Validators.required, Validators.min(this.beamsMin)]],
            material: [Utils.getEnumKey(Material, material), Validators.required]
        });
    }

    isRequiredError = (field: string) => Utils.isRequiredError(this.form, field);

    isNumberMinError = (field: string) => Utils.isNumberMinError(this.form, field);

    isNumberMaxError = (field: string) => Utils.isNumberMaxError(this.form, field);

    isTextMaxError = (field: string) => Utils.isTextMaxError(this.form, field);

    requiredErrorMessage = () => Utils.requiredErrorMessage();

    numberMinErrorMessage = (min: number) => Utils.numberMinErrorMessage(min);

    numberMaxErrorMessage = (max: number) => Utils.numberMaxErrorMessage(max);

    textMaxErrorMessage = (maxLength: number) => Utils.textMaxErrorMessage(maxLength);

    apply = () => {
        this.data.cross = {
            ...this.data.cross,
            name: this.edit ? this.data.cross.name : this.form.get('name').value,
            expiryDate: this.form.get('expiryDate').value,
            comment: this.form.get('comment').value,
            angle: this.form.get('angle').value,
            weight: this.form.get('angle').value,
            beams: this.form.get('angle').value,
            material: this.form.get('material').value
        };
        for (const key in this.data.cross) {
            if (this.data.cross[key] === null || this.data.cross[key] === '') {
                this.data.cross[key] = undefined;
            }
        }
        this.dialogRef.close(true);
    }
}

export interface CrossFormData {
    cross: Cross;
    edit: boolean;
}
