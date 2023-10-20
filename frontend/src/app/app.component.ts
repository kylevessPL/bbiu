import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
    title = 'BBIU';
    mobileQuery: MediaQueryList;

    private readonly mobileQueryListener: () => void;

    constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
        this.mobileQuery = media.matchMedia('(max-width: 600px)');
        this.mobileQueryListener = () => changeDetectorRef.detectChanges();
    }

    ngOnInit() {
        this.mobileQuery.addEventListener('change', this.mobileQueryListener);
    }

    ngOnDestroy() {
        this.mobileQuery.removeEventListener('change', this.mobileQueryListener);
    }
}
