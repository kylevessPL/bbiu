import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {CrossFormDialogComponent} from './cross-form-dialog.component';

describe('CrosseFormDialogComponent', () => {
    let component: CrossFormDialogComponent;
    let fixture: ComponentFixture<CrossFormDialogComponent>;

    beforeEach(waitForAsync(() => TestBed.configureTestingModule({
        declarations: [CrossFormDialogComponent]
    }).compileComponents()));

    beforeEach(() => {
        fixture = TestBed.createComponent(CrossFormDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => expect(component).toBeTruthy());
});
