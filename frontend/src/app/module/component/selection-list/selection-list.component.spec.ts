import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {SelectionListComponent} from './selection-list.component';

describe('SelectionListComponent', () => {
    let component: SelectionListComponent<any>;
    let fixture: ComponentFixture<SelectionListComponent<any>>;

    beforeEach(waitForAsync(() => TestBed.configureTestingModule({
        declarations: [SelectionListComponent]
    }).compileComponents()));

    beforeEach(() => {
        fixture = TestBed.createComponent(SelectionListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => expect(component).toBeTruthy());
});
