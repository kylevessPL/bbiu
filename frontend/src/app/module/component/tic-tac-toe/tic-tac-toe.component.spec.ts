import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {TicTacToeComponent} from './tic-tac-toe.component';

describe('TicTacToeComponent', () => {
    let component: TicTacToeComponent;
    let fixture: ComponentFixture<TicTacToeComponent>;

    beforeEach(waitForAsync(() => TestBed.configureTestingModule({
        declarations: [TicTacToeComponent]
    }).compileComponents()));

    beforeEach(() => {
        fixture = TestBed.createComponent(TicTacToeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => expect(component).toBeTruthy());
});
