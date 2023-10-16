import {Pipe, PipeTransform} from '@angular/core';
import {DatePipe} from '@angular/common';
import {environment} from '../../../environments/environment';

@Pipe({name: 'dateFormatterPipe'})
export class DateFormatterPipe implements PipeTransform {
    readonly _datepipe: DatePipe = new DatePipe('en-US');

    transform(object: any): unknown {
        return object instanceof Date
            ? this._datepipe.transform(object, environment.dateFormat)
            : object;
    }
}
