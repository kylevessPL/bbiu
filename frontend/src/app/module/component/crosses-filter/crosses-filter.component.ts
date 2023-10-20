import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {Material} from '../../model/material.enum';

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

    constructor(private fb: FormBuilder) {
    }

    ngOnInit() {
        this.form = this.fb.group({
            id: null,
            name: null,
            comment: null,
            angle: null,
            weight: null,
            beams: null,
            material: new FormControl(this.materialKeys, {nonNullable: true})
        });
    }

    apply() {
        const filter: Record<string, any> = Object.entries(this.form.value)
            .filter(([key, value]) => value !== null && value !== '')
            .reduce((acc, [key, value]) => {
                acc[key] = value;
                return acc;
            }, {});
        this.filterEvent.emit(filter);
    }

    clearField(field: string, $event: Event = null) {
        this.form.get(field).reset();
        $event?.stopPropagation();
    }

    selectClosed(field: string) {
        if (this.form.get(field).value.length === 0) {
            this.clearField(field);
        }
    }
}
