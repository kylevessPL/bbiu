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
    outcomes: Player[] = [];
    newGame = new Subject<void>();

    get winnerMessage() {
        switch (this.winner) {
            case Player.X:
            case Player.O:
                return `Player ${this.winner} won!`;
            default:
                return `It's a tie!`;
        }
    }

    get winnerClass() {
        switch (this.winner) {
            case Player.X:
                return 'winner-x';
            case Player.O:
                return 'winner-o';
            default:
                return 'winner-tie';
        }
    }

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
        if (player !== undefined) {
            this.outcomes = [...this.outcomes, player];
        }
    }

    resetOutcomes = () => {
        this.outcomes = [];
    }
}
