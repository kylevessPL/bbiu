import {Injectable} from '@angular/core';
import {PageMeta} from '../model/page-meta';
import {BackendService} from './backend.service';
import {environment} from '../../../environments/environment';
import {restUrl} from '../../../environments/rest-url';
import {map} from "rxjs";
import {Cross} from "../model/cross";
import {Nought} from "../model/nought";
import {Color} from "../model/color.enum";

@Injectable({providedIn: 'root'})
export class NoughtService {
    constructor(private httpClient: BackendService) {
    }

    public getAllNoughts = (pageMeta?: PageMeta) =>
        this.httpClient.getPage<any>(`${environment.baseUrl}/${restUrl.noughtsBase}`, pageMeta)
            .pipe(map(crosses => this.mapNoughts(crosses)))

    private mapNoughts = (response: Cross) => {
        // response.content = response.content.map(this.mapNought);
        return response;
    }

    private mapNought = (item: Nought) => {
        item.color = Color[item.color];
        return item;
    }
}
