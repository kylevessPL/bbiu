import {Component, EventEmitter, Input, OnChanges, Output} from '@angular/core';
import {Player} from '../../model/player.enum';
import ArrayUtils from '../../common/array-utils';

@Component({
    selector: 'app-game-stats',
    templateUrl: './game-stats.component.html',
    styleUrls: ['./game-stats.component.scss']
})
export class GameStatsComponent implements OnChanges {
    @Input() data: Player[];
    @Output() resetEvent = new EventEmitter<void>();

    protected readonly playerKeys = Object.keys(Player);
    protected playersStats: Map<string, number[]>;
    protected ties: number;
    protected total: number;

    ngOnChanges() {
        this.calculateStats();
    }

    reset = () => this.resetEvent.emit();

    private calculateStats = () => {
        this.ties = ArrayUtils.countBy(this.data, x => x === null);
        this.total = this.data.length;
        this.playersStats = this.calculatePlayersStats();
    }

    private calculatePlayersStats = () => {
        const statsMap = this.playerKeys.reduce((map, player) => {
            map.set(Player[player], {
                wins: 0,
                losses: this.total - this.ties
            });
            return map;
        }, new Map<Player, PlayerStats>());
        this.data
            .filter(player => player !== null)
            .forEach(player => {
                statsMap.get(player).wins++;
                statsMap.get(player).losses--;
            });
        return Array.from(statsMap.values()).reduce((map, stats) => {
            map.set('Wins', (map.get('Wins') ?? []).concat(stats.wins));
            map.set('Losses', (map.get('Losses') ?? []).concat(stats.losses));
            return map;
        }, new Map<string, number[]>());
    }
}

interface PlayerStats {
    wins: number;
    losses: number;
}
