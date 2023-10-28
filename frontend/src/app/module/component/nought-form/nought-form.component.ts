import {Component, EventEmitter, Input, OnChanges, OnDestroy, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import EnumUtils from '../../util/enum-utils';
import {DateFormatterPipe} from '../../pipe/date-formatter.pipe';
import ValidationUtils from '../../util/validation-utils';
import {validation} from '../../model/validation';
import {Color} from '../../model/color.enum';
import {Nought} from '../../model/nought';
import {Subscription} from 'rxjs';
import {formatNumber} from '@angular/common';

@Component({
    selector: 'app-nought-form',
    templateUrl: './nought-form.component.html',
    styleUrls: ['./nought-form.component.scss'],
    providers: [DateFormatterPipe]
})
export class NoughtFormComponent implements OnChanges, OnDestroy {
    @Input() nought: Nought;
    @Output() saveEvent = new EventEmitter<Nought>();
    @Output() deleteEvent = new EventEmitter();

    form: FormGroup;
    edit: boolean;
    color = Color;
    colorKeys = Object.keys(this.color);

    private radiusSubscription: Subscription;

    protected readonly nameMaxLength = validation.nameMaxLength;
    protected readonly commentMaxLength = validation.commentMaxLength;
    protected readonly radiusMin = validation.radiusMin;
    protected readonly radiusMax = validation.radiusMax;
    protected readonly radiusStep = validation.radiusStep;

    constructor(private dateFormatter: DateFormatterPipe, private fb: FormBuilder) {
    }

    ngOnChanges() {
        const {id, name, radius, color, creationDate, comment} = this.nought ?? {};
        this.edit = this.nought !== undefined;
        this.radiusSubscription?.unsubscribe();
        this.form = this.fb.group({
            id: new FormControl({value: id, disabled: true}),
            name: new FormControl(
                {value: name, disabled: this.edit},
                [Validators.required, Validators.maxLength(this.nameMaxLength)]
            ),
            creationDate: new FormControl({value: this.dateFormatter.transform(creationDate), disabled: true}),
            comment: [comment, Validators.maxLength(this.commentMaxLength)],
            radius: new FormControl(radius, {
                validators: [Validators.required, Validators.min(this.radiusMin), Validators.max(this.radiusMax)],
                updateOn: 'blur'
            }),
            color: [EnumUtils.getEnumKey(Color, color), Validators.required]
        });
        this.radiusSubscription = this.form.get('radius').valueChanges.subscribe(res => res &&
            this.formatDecimalField('radius', res)
        );
    }

    ngOnDestroy() {
        this.radiusSubscription?.unsubscribe();
    }

    isRequiredError = (field: string) => ValidationUtils.isRequiredError(this.form, field);

    isNumberMinError = (field: string) => ValidationUtils.isNumberMinError(this.form, field);

    isNumberMaxError = (field: string) => ValidationUtils.isNumberMaxError(this.form, field);

    isTextMaxError = (field: string) => ValidationUtils.isTextMaxError(this.form, field);

    requiredErrorMessage = () => ValidationUtils.requiredErrorMessage();

    numberMinErrorMessage = (min: number) => ValidationUtils.numberMinErrorMessage(min);

    numberMaxErrorMessage = (max: number) => ValidationUtils.numberMaxErrorMessage(max);

    textMaxErrorMessage = (maxLength: number) => ValidationUtils.textMaxErrorMessage(maxLength);

    save = () => {
        const nought = this.applyData();
        this.pruneData(nought);
        this.saveEvent.emit(nought);
    }

    delete = () => this.deleteEvent.emit();

    private applyData = () => {
        const nought: Nought = {
            ...this.nought,
            name: this.edit ? this.nought.name : this.form.get('name').value,
            comment: this.form.get('comment').value,
            radius: this.form.get('radius').value,
            color: this.form.get('color').value
        };
        return nought;
    }

    private pruneData = (nought: Nought) => {
        for (const key in nought) {
            if (nought[key] === null || nought[key] === '') {
                nought[key] = undefined;
            }
        }
    }

    private formatDecimalField = (field: string, value: number) => {
        const patch = formatNumber(value, 'en-US', '1.1-1');
        this.form.get(field).reset();
        this.form.get(field).setValue(patch.replace(/,/g, ''), {
            emitEvent: false
        });
    }
}
