import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {SquarePieceComponent} from './square-piece.component';

describe('SquarePieceComponent', () => {
    let component: SquarePieceComponent;
    let fixture: ComponentFixture<SquarePieceComponent>;

    beforeEach(waitForAsync(() => TestBed.configureTestingModule({
        declarations: [SquarePieceComponent]
    }).compileComponents()));

    beforeEach(() => {
        fixture = TestBed.createComponent(SquarePieceComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => expect(component).toBeTruthy());
});
