import {Pipe, PipeTransform} from '@angular/core';
import {get} from 'get-wild';

@Pipe({name: 'dataPropertyGetter'})
export class DataPropertyGetterPipe implements PipeTransform {
    transform(object: any, keyName: string): unknown {
        return get(object, keyName);
    }
}
