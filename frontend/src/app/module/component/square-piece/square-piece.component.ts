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

    getColor = () => {
        switch (this.player) {
            case Player.X:
                return 'accent';
            case Player.O:
                return 'warn';
            default:
                return 'primary';
        }
    }

    getIcon = () => {
        switch (this.player) {
            case Player.X:
                return 'close';
            case Player.O:
                return 'circle';
            default:
                return undefined;
        }
    }

    isDisabled = () => this.disabled || this.player !== null;
}
