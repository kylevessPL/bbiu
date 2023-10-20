import {Page} from './page';
import {ThemePalette} from '@angular/material/core';

export interface TableRowAction<T extends Page<T>> {
    description: string;
    icon: string;
    color: ThemePalette;
    action: (item: T) => any;
}
