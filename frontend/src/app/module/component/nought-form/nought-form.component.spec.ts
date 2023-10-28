import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {NoughtFormComponent} from './nought-form.component';

describe('NoughtFormComponent', () => {
    let component: NoughtFormComponent;
    let fixture: ComponentFixture<NoughtFormComponent>;

    beforeEach(waitForAsync(() => TestBed.configureTestingModule({
        declarations: [NoughtFormComponent]
    }).compileComponents()));

    beforeEach(() => {
        fixture = TestBed.createComponent(NoughtFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => expect(component).toBeTruthy());
});
