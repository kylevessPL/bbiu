import {Page} from './page';

export interface CompanyBranch extends Page<CompanyBranch> {
    content: CompanyBranch[];
    id: number;
    name: string;
    address: string;
    latitude: number;
    longitude: number;
    email: string;
    phoneNumber: string;
}
