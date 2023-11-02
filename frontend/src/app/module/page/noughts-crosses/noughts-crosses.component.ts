import {AfterViewInit, Component} from '@angular/core';
import {Player} from '../../model/player.enum';
import {Subject} from 'rxjs';

@Component({
    selector: 'app-noughts-crosses',
    templateUrl: './noughts-crosses.component.html',
    styleUrls: ['./noughts-crosses.component.scss']
})
export class NoughtsCrossesComponent implements AfterViewInit {
    player = Player;
    playerKeys = Object.keys(this.player);
    current = Player.X;
    winner: Player;
    newGame = new Subject<void>();

    ngAfterViewInit() {
        this.startNewGame();
    }

    playerColor = (key: Player) => key === Player.X ? 'accent' : 'warn';

    playerSelected = (key: Player) => this.current === key;

    startNewGame = () => this.newGame.next();

    updateCurrentPlayer = (player: Player) => {
        this.current = player;
    }

    updateWinner(player: Player) {
        this.winner = player;
    }
}
