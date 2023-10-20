import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {CrossesFilterComponent} from './crosses-filter.component';
import {Page} from '../../model/page';

describe('CrossesFilterComponent', () => {
    let component: CrossesFilterComponent<Page<any>>;
    let fixture: ComponentFixture<CrossesFilterComponent<any>>;

    beforeEach(waitForAsync(() => TestBed.configureTestingModule({
        declarations: [CrossesFilterComponent]
    }).compileComponents()));

    beforeEach(() => {
        fixture = TestBed.createComponent(CrossesFilterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => expect(component).toBeTruthy());
});
