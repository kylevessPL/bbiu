import {Page} from './page';
import {Material} from './material.enum';

export interface Cross extends Page<Cross> {
    content: Cross[];
    id: number;
    name: string;
    angle: number;
    weight: number;
    beams: number;
    material: Material;
    creationDate: Date;
    expiryDate: Date;
    comment: string;
}
