import {Role} from './role';
import {Page} from './page';
import {Person} from './person';

export interface User extends Page<User> {
    content: User[];
    id: number;
    email: string;
    active: boolean;
    person: Person;
    roles: Role[];
}
