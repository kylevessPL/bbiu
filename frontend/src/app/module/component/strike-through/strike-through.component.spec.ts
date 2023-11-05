import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {StrikeThroughComponent} from './strike-through.component';

describe('StrikeThroughComponent', () => {
    let component: StrikeThroughComponent;
    let fixture: ComponentFixture<StrikeThroughComponent>;

    beforeEach(waitForAsync(() => TestBed.configureTestingModule({
        declarations: [StrikeThroughComponent]
    }).compileComponents()));

    beforeEach(() => {
        fixture = TestBed.createComponent(StrikeThroughComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => expect(component).toBeTruthy());
});
