import {Component, Input} from '@angular/core';
import {Player} from '../../model/player.enum';

@Component({
    selector: 'app-square-piece',
    templateUrl: './square-piece.component.html',
    styleUrls: ['./square-piece.component.scss']
})
export class SquarePieceComponent {
    @Input() player?: Player;
    @Input() disabled = false;

    protected get color() {
        switch (this.player) {
            case Player.X:
                return 'accent';
            case Player.O:
                return 'warn';
            default:
                return 'primary';
        }
    }

    protected get icon() {
        switch (this.player) {
            case Player.X:
                return 'close';
            case Player.O:
                return 'circle';
            default:
                return undefined;
        }
    }

    protected get moveDisabled() {
        return !this.disabled && this.player !== null;
    }

    protected get fullyDisabled() {
        return this.disabled || this.player !== null;
    }
}
