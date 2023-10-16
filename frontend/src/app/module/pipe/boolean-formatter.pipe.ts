import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'booleanFormatterPipe'})
export class BooleanFormatterPipe implements PipeTransform {
    transform(param: any): unknown {
        return typeof param == 'boolean'
            ? this.asYesNo(param)
            : param;
    }

    private asYesNo = (value: boolean) => value ? 'Yes' : 'No';
}
