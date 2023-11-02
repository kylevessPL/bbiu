import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Player} from '../../model/player.enum';
import {first, Observable, Subscription, timer} from 'rxjs';
import {BehaviorEventEmitter} from '../../common/behavior-event-emitter';
import {animate, style, transition, trigger} from '@angular/animations';

const initialPlayer = Player.X;

const winConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

@Component({
    selector: 'app-tic-tac-toe',
    templateUrl: './tic-tac-toe.component.html',
    styleUrls: ['./tic-tac-toe.component.scss'],
    animations: [
        trigger('fadeIn', [
            transition(':enter', [
                style({opacity: '0'}),
                animate('.5s ease-out', style({opacity: '1'})),
            ]),
        ])
    ]
})
export class TicTacToeComponent implements OnInit, OnDestroy {
    @Input() start = new Observable<void>();
    @Output() player = new BehaviorEventEmitter<Player>();
    @Output() outcome = new EventEmitter<Player>();

    protected squares: Player[];
    protected disabled = true;
    private startSubscription: Subscription;

    private get nextPlayer() {
        return this.player.value === Player.X ? Player.O : Player.X;
    }

    ngOnInit() {
        this.startSubscription = this.start.subscribe(() =>
            timer(0)
                .pipe(first())
                .subscribe(this.newGame)
        );
    }

    ngOnDestroy() {
        this.startSubscription.unsubscribe();
    }

    newGame = () => {
        this.squares = Array(9).fill(null);
        this.disabled = false;
        this.player.emit(initialPlayer);
    }

    makeMove = (position: number) => {
        this.squares.splice(position, 1, this.player.value);
        this.checkOutcome();
    }

    private switchPlayer = () => this.player.emit(this.nextPlayer);

    private checkOutcome = () => {
        const winner = this.calculateWinner();
        if (winner !== undefined) {
            this.disabled = true;
            this.outcome.emit(winner);
        } else {
            this.switchPlayer();
        }
    }

    private calculateWinner = () => {
        const winner = winConditions.find(([a, b, c]) =>
            this.squares[a] && this.squares[a] === this.squares[b] && this.squares[a] === this.squares[c]
        )?.map(index => this.squares[index])?.at(0);
        return winner ?? this.gameCompleted() ? null : undefined;
    }

    private gameCompleted = () => this.squares.every(value => value !== null);
}
