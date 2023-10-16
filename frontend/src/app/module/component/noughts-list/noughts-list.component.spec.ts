import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {NoughtsListComponent} from './noughts-list.component';

describe('NoughtsListComponent', () => {
    let component: NoughtsListComponent;
    let fixture: ComponentFixture<NoughtsListComponent>;

    beforeEach(waitForAsync(() => TestBed.configureTestingModule({
        declarations: [NoughtsListComponent]
    }).compileComponents()));

    beforeEach(() => {
        fixture = TestBed.createComponent(NoughtsListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => expect(component).toBeTruthy());
});
