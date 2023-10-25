import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Material} from '../../model/material.enum';
import ValidationUtils from '../../util/validation-utils';
import {validation} from '../../model/validation';

@Component({
    selector: 'app-crosses-filter',
    templateUrl: './crosses-filter.component.html',
    styleUrls: ['./crosses-filter.component.scss']
})
export class CrossesFilterComponent implements OnInit {
    @Output() filterEvent = new EventEmitter<Record<string, any>>();

    form: FormGroup;
    material = Material;
    materialKeys = Object.keys(this.material);

    protected readonly idMin = validation.idMin;
    protected readonly nameMaxLength = validation.nameMaxLength;
    protected readonly commentMaxLength = validation.commentMaxLength;
    protected readonly angleMin = validation.angleMin;
    protected readonly angleMax = validation.angleMax;
    protected readonly weightMin = validation.weightMin;
    protected readonly weightMax = validation.weightMax;
    protected readonly beamsMin = validation.beamsMin;

    constructor(private fb: FormBuilder) {
    }

    ngOnInit() {
        this.form = this.fb.group({
            id: [null, Validators.min(this.idMin)],
            name: [null, Validators.maxLength(this.nameMaxLength)],
            comment: [null, Validators.maxLength(this.commentMaxLength)],
            angle: [null, [Validators.min(this.angleMin), Validators.max(this.angleMax)]],
            weight: [null, [Validators.min(this.weightMin), Validators.max(this.weightMax)]],
            beams: [null, Validators.min(this.beamsMin)],
            material: new FormControl(this.materialKeys, {nonNullable: true})
        });
    }

    apply = () => {
        const filter: Record<string, any> = Object.entries(this.form.value)
            .filter(([key, value]) => value !== null && value !== '')
            .reduce((acc, [key, value]) => {
                acc[key] = value;
                return acc;
            }, {});
        this.filterEvent.emit(filter);
    }

    clearField = (field: string, $event: Event = null) => {
        this.form.get(field).reset();
        $event?.stopPropagation();
    }

    selectClosed = (field: string) => {
        if (this.form.get(field).value.length === 0) {
            this.clearField(field);
        }
    }

    isNumberMinError = (field: string) => ValidationUtils.isNumberMinError(this.form, field);

    isNumberMaxError = (field: string) => ValidationUtils.isNumberMaxError(this.form, field);

    isTextMaxError = (field: string) => ValidationUtils.isTextMaxError(this.form, field);

    numberMinErrorMessage = (min: number) => ValidationUtils.numberMinErrorMessage(min);

    numberMaxErrorMessage = (max: number) => ValidationUtils.numberMaxErrorMessage(max);

    textMaxErrorMessage = (maxLength: number) => ValidationUtils.textMaxErrorMessage(maxLength);
}
