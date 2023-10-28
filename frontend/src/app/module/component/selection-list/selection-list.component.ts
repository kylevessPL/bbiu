import {Component, EventEmitter, Input, OnChanges, Output} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {GlobalService} from '../../service/global.service';
import {environment} from '../../../../environments/environment';
import {ListAccessors} from '../../model/list-accessors';

@Component({
    selector: 'app-selection-list',
    templateUrl: './selection-list.component.html',
    styleUrls: ['./selection-list.component.scss']
})
export class SelectionListComponent<T> implements OnChanges {
    @Input() data: T[];
    @Input() selected: T;
    @Input() accessors: ListAccessors;
    @Input() error: HttpErrorResponse;
    @Output() selectionEvent = new EventEmitter<T>();

    hidden = true;

    protected readonly environment = environment;

    constructor(private globalService: GlobalService) {
    }

    ngOnChanges() {
        if (this.data) {
            this.hidden = false;
        } else if (this.error && this.error.status !== 200) {
            this.globalService.showDataFetchErrorDialog();
            this.data = null;
        }
    }

    selectItem = (item: T, changed: boolean) => changed && this.selectionEvent.emit(item);

    itemSelected = (item: T) => {
        const identifier = this.accessors.identifier;
        return this.selected && this.selected[identifier] === item[identifier];
    }
}
