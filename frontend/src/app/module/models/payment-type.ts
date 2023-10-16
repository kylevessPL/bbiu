import {NamedModel} from './named-model';

export interface PaymentType extends NamedModel {
    id: number;
    code: string;
    active: boolean;
}
