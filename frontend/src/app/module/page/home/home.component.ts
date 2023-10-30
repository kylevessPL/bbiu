import {Component} from '@angular/core';
import images from '../../../../assets/img/home/index.json';
import {ResizedEvent} from 'angular-resize-event';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent {
    width: number;
    protected readonly images = images;

    onResized(event: ResizedEvent) {
        this.width = event.newRect.width;
    }
}
