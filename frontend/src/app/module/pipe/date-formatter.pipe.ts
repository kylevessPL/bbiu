import {Pipe, PipeTransform} from '@angular/core';
import {DatePipe} from '@angular/common';
import {environment} from '../../../environments/environment';

@Pipe({name: 'dateFormatterPipe'})
export class DateFormatterPipe implements PipeTransform {
    readonly datepipe: DatePipe = new DatePipe('en-US');

    transform(object: any): unknown {
        return object instanceof Date
            ? this.datepipe.transform(object, environment.dateFormat)
            : object;
    }
}
