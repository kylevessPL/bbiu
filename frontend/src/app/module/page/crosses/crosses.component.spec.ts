import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {CrossesComponent} from './crosses.component';

describe('CrossesComponent', () => {
    let component: CrossesComponent;
    let fixture: ComponentFixture<CrossesComponent>;

    beforeEach(waitForAsync(() => TestBed.configureTestingModule({
        declarations: [CrossesComponent]
    }).compileComponents()));

    beforeEach(() => {
        fixture = TestBed.createComponent(CrossesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => expect(component).toBeTruthy());
});
