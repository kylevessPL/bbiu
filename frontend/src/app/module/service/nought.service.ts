import {Injectable} from '@angular/core';
import {PageMeta} from '../model/page-meta';
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

    public getAllNoughts = (pageMeta?: PageMeta) =>
        this.backendService.get<Nought[]>(`${environment.baseUrl}/${restUrl.noughtsBase}`)
            .pipe(map(noughts => this.mapNoughts(noughts)))

    public createNought = (nought: Nought) =>
        this.backendService.post(`${environment.baseUrl}/${restUrl.noughtsBase}`, nought)

    public updateNought = (id: number, nought: Nought) =>
        this.backendService.put(`${environment.baseUrl}/${restUrl.noughtsBase}/${id}`, nought)

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
