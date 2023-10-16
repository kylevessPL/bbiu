import {Page} from './page';
import {PaymentType} from './payment-type';
import {NamedModel} from './named-model';

export interface Payment extends Page<Payment>, NamedModel {
    content: Payment[];
    id: number;
    valid: boolean;

    statusChangeDate: Date;

    type: PaymentType;

    status: string;
}
