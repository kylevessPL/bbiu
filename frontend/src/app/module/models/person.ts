import {Page} from './page';

export interface Person extends Page<Person> {
    content: Person[];
    id: number;
    firstName: string;
    lastName: string;
}
