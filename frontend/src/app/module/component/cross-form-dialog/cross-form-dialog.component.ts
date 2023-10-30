import {Component, EventEmitter, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Material} from '../../model/material.enum';
import {Cross} from '../../model/cross';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import EnumUtils from '../../util/enum-utils';
import {DateFormatterPipe} from '../../pipe/date-formatter.pipe';
import ValidationUtils from '../../util/validation-utils';
import {validation} from '../../model/validation';
import moment, {Moment} from 'moment';

@Component({
    selector: 'app-cross-form-dialog',
    templateUrl: './cross-form-dialog.component.html',
    styleUrls: ['./cross-form-dialog.component.scss'],
    providers: [DateFormatterPipe]
})
export class CrossFormDialogComponent implements OnInit {
    export = new EventEmitter<Cross>();
    edit: boolean;
    form: FormGroup;
    material = Material;
    materialKeys = Object.keys(this.material);
    dateNow = new Date();

    protected readonly nameMaxLength = validation.nameMaxLength;
    protected readonly commentMaxLength = validation.commentMaxLength;
    protected readonly angleMin = validation.angleMin;
    protected readonly angleMax = validation.angleMax;
    protected readonly weightMin = validation.weightMin;
    protected readonly weightMax = validation.weightMax;
    protected readonly beamsMin = validation.beamsMin;

    constructor(@Inject(MAT_DIALOG_DATA) public data: CrossFormData,
                private dateFormatter: DateFormatterPipe,
                private fb: FormBuilder) {
    }

    ngOnInit() {
        const {
            id, name, angle, weight, beams,
            material, creationDate, expiryDate, comment
        } = this.data?.cross ?? {};
        this.edit = this.data?.cross !== undefined;
        this.form = this.fb.group({
            id: new FormControl({value: id, disabled: true}),
            name: new FormControl(
                {value: name, disabled: this.edit},
                [Validators.required, Validators.maxLength(this.nameMaxLength)]
            ),
            creationDate: new FormControl({value: this.dateFormatter.transform(creationDate), disabled: true}),
            expiryDate: expiryDate ? moment(expiryDate) : null,
            comment: [comment, Validators.maxLength(this.commentMaxLength)],
            angle: [angle, [Validators.required, Validators.min(this.angleMin), Validators.max(this.angleMax)]],
            weight: [weight, [Validators.required, Validators.min(this.weightMin), Validators.max(this.weightMax)]],
            beams: [beams, [Validators.required, Validators.min(this.beamsMin)]],
            material: [EnumUtils.getEnumKey(Material, material), Validators.required]
        });
    }

    isRequiredError = (field: string) => ValidationUtils.isRequiredError(this.form, field);

    isNumberMinError = (field: string) => ValidationUtils.isNumberMinError(this.form, field);

    isNumberMaxError = (field: string) => ValidationUtils.isNumberMaxError(this.form, field);

    isTextMaxError = (field: string) => ValidationUtils.isTextMaxError(this.form, field);

    requiredErrorMessage = () => ValidationUtils.requiredErrorMessage();

    numberMinErrorMessage = (min: number) => ValidationUtils.numberMinErrorMessage(min);

    numberMaxErrorMessage = (max: number) => ValidationUtils.numberMaxErrorMessage(max);

    textMaxErrorMessage = (maxLength: number) => ValidationUtils.textMaxErrorMessage(maxLength);

    fieldFilled = (field: string) => {
        const value = this.form.get(field).value;
        return value !== null && value !== '';
    }

    apply = () => {
        const cross = this.applyData();
        this.pruneData(cross);
        this.export.emit(cross);
    }

    private applyData = () => {
        const cross: Cross = {
            ...this.data?.cross,
            name: this.edit ? this.data.cross.name : this.form.get('name').value,
            expiryDate: this.toDateWithoutSeconds(this.form.get('expiryDate').value),
            comment: this.form.get('comment').value,
            angle: this.form.get('angle').value,
            weight: this.form.get('weight').value,
            beams: this.form.get('beams').value,
            material: this.form.get('material').value
        };
        return cross;
    }

    private pruneData = (cross: Cross) => {
        for (const key in cross) {
            if (cross[key] === null || cross[key] === '') {
                cross[key] = undefined;
            }
        }
    }

    private toDateWithoutSeconds = (value: Moment) => {
        const date = value?.toDate();
        if (date) {
            date.setSeconds(0);
        }
        return date;
    }
}

export interface CrossFormData {
    cross: Cross;
    edit: boolean;
}
