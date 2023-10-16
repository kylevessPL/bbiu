import {Page} from './page';
import {ConstantModel} from './constant-model';
import {Image} from './image';
import {NamedModel} from './named-model';
import {DescribedModel} from './described-model';

export interface Product extends Page<Product>, NamedModel, DescribedModel {
    content: Product[];
    id: number;
    price: number;
    category: ConstantModel;
    image: Image;
    quantity: number;
}
