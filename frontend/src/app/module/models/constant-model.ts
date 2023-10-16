import {NamedModel} from './named-model';
import {DescribedModel} from './described-model';

export interface ConstantModel extends NamedModel, DescribedModel {
    id: number;
    code: string;
}
