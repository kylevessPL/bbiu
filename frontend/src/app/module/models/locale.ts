import {Country} from '@angular-material-extensions/select-country';

export interface Locale extends Country {
    id: number;
    languageCode: string;
    fallback: boolean;
}
