import {Injectable} from '@angular/core';
import {BackendService} from './backend.service';
import {environment} from '../../../environments/environment';
import {restUrl} from '../../../environments/rest-url';
import {map} from 'rxjs';
import {Nought} from '../model/nought';
import {Color} from '../model/color.enum';

@Injectable({providedIn: 'root'})
export class NoughtService {
    constructor(private backendService: BackendService) {
    }

    public getAllNoughts = () =>
        this.backendService.get<Nought[]>(`${environment.baseUrl}/${restUrl.noughtsBase}`)
            .pipe(map(items => this.mapNoughts(items)))

    public getNought = (id: number) =>
        this.backendService.get<Nought>(`${environment.baseUrl}/${restUrl.noughtsBase}/${id}`)
            .pipe(map(item => this.mapNought(item)))

    public createNought = (nought: Nought) =>
        this.backendService.post<Nought>(`${environment.baseUrl}/${restUrl.noughtsBase}`, nought)
            .pipe(map(item => this.mapNought(item)))

    public updateNought = (id: number, nought: Nought) =>
        this.backendService.put<Nought>(`${environment.baseUrl}/${restUrl.noughtsBase}/${id}`, nought)
            .pipe(map(item => this.mapNought(item)))

    public deleteNought = (id: number) =>
        this.backendService.delete(`${environment.baseUrl}/${restUrl.noughtsBase}/${id}`)

    private mapNoughts = (response: Nought[]) => {
        response = response.map(this.mapNought);
        return response;
    }

    private mapNought = (item: Nought) => {
        item.color = Color[item.color];
        return item;
    }
}
