import {Page} from './page';
import {ConstantModel} from './constant-model';

export interface Order extends Page<Order> {
    content: Order[];
    id: number;
    placementDate: Date;
    statusChangeDate: Date;
    totalPrice: number;
    deliveryType: ConstantModel;
    status: ConstantModel;
    invoiceUuid: string;
}
