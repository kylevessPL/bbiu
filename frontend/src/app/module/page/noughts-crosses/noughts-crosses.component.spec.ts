import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {NoughtsCrossesComponent} from './noughts-crosses.component';

describe('NoughtsCrossesComponent', () => {
    let component: NoughtsCrossesComponent;
    let fixture: ComponentFixture<NoughtsCrossesComponent>;

    beforeEach(waitForAsync(() => TestBed.configureTestingModule({
        declarations: [NoughtsCrossesComponent]
    }).compileComponents()));

    beforeEach(() => {
        fixture = TestBed.createComponent(NoughtsCrossesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => expect(component).toBeTruthy());
});
