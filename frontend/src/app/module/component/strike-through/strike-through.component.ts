import {Component, Input, OnChanges} from '@angular/core';

@Component({
    selector: 'app-strike-through',
    templateUrl: './strike-through.component.html',
    styleUrls: ['./strike-through.component.scss']
})
export class StrikeThroughComponent implements OnChanges {
    @Input() elements: DOMRect[];

    protected start: Point;
    protected end: Point;

    ngOnChanges() {
        this.calculateCoordinates();
    }

    private calculateCoordinates = () => {
        const points = this.elements.map(rect => ({
            rect,
            center: {
                x: rect.left + rect.width / 2,
                y: rect.top + rect.height / 2,
            } as Point
        }) as CenterPoint);
        points.sort((a, b) => a.center.x - b.center.x);
        const alignment = this.determineAlignment(points[0], points[2]);
        this.start = this.calculateStartPoint(points[0], alignment);
        this.end = this.calculateEndPoint(points[2], alignment);
    }

    private determineAlignment = (start: CenterPoint, end: CenterPoint) => {
        const {x: startX, y: startY} = start.center;
        const {x: endX, y: endY} = end.center;
        if (Math.abs(startX - endX) > Math.abs(startY - endY)) {
            return Alignment.HORIZONTAL;
        }
        if (Math.abs(startX - endX) < Math.abs(startY - endY)) {
            return Alignment.VERTICAL;
        }
        if (startY < endY) {
            return Alignment.DIAGONAL_LEFT;
        }
        return Alignment.DIAGONAL_RIGHT;
    }

    private calculateStartPoint = (point: CenterPoint, alignment: Alignment): Point => {
        const {rect, center} = point;
        switch (alignment) {
            case Alignment.VERTICAL:
                return {
                    x: center.x,
                    y: rect.top
                };
            case Alignment.HORIZONTAL:
                return {
                    x: rect.left,
                    y: center.y
                };
            case Alignment.DIAGONAL_LEFT:
                return {
                    x: rect.left,
                    y: rect.top
                };
            case Alignment.DIAGONAL_RIGHT:
                return {
                    x: rect.left,
                    y: rect.bottom
                };
        }
    }

    private calculateEndPoint = (point: CenterPoint, alignment: Alignment) => {
        const {rect, center} = point;
        switch (alignment) {
            case Alignment.VERTICAL:
                return {
                    x: center.x,
                    y: rect.bottom
                };
            case Alignment.HORIZONTAL:
                return {
                    x: rect.right,
                    y: center.y
                };
            case Alignment.DIAGONAL_LEFT:
                return {
                    x: rect.right,
                    y: rect.bottom
                };
            case Alignment.DIAGONAL_RIGHT:
                return {
                    x: rect.right,
                    y: rect.top
                };
        }
    }
}

enum Alignment {
    VERTICAL, HORIZONTAL, DIAGONAL_LEFT, DIAGONAL_RIGHT
}

interface CenterPoint {
    rect: DOMRect;
    center: Point;
}

interface Point {
    x: number;
    y: number;
}
