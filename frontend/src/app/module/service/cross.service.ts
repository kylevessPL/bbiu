import {Injectable} from '@angular/core';
import {PageMeta} from '../model/page-meta';
import {EncodeUriParamService} from './encode-uri-param.service';
import {environment} from '../../../environments/environment';
import {restUrl} from '../../../environments/rest-url';
import {Cross} from '../model/cross';
import {map} from 'rxjs';
import {Material} from '../model/material.enum';

@Injectable({providedIn: 'root'})
export class CrossService {
    constructor(private httpClient: EncodeUriParamService) {
    }

    public getAllCrosses = (pageMeta?: PageMeta) =>
        this.httpClient.getPage<Cross>(`${environment.baseUrl}/${restUrl.crossesBase}`, pageMeta)
            .pipe(map(crosses => this.mapCrosses(crosses)))

    private mapCrosses(response: Cross) {
        response.content = response.content.map(this.mapCross);
        return response;
    }

    private mapCross(item: Cross) {
        item.material = Material[item.material];
        return item;
    }
}
