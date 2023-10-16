import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {NoughtsComponent} from './noughts.component';

describe('NoughtsComponent', () => {
    let component: NoughtsComponent;
    let fixture: ComponentFixture<NoughtsComponent>;

    beforeEach(waitForAsync(() => TestBed.configureTestingModule({
        declarations: [NoughtsComponent]
    }).compileComponents()));

    beforeEach(() => {
        fixture = TestBed.createComponent(NoughtsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => expect(component).toBeTruthy());
});
