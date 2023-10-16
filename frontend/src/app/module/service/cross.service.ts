import {Injectable} from '@angular/core';
import {PageMeta} from '../models/page-meta';
import {EncodeUriParamService} from './encode-uri-param.service';
import {environment} from '../../../environments/environment';
import {restUrl} from '../../../environments/rest-url';
import {Order} from '../models/order';

@Injectable({providedIn: 'root'})
export class CrossService {
    constructor(private httpClient: EncodeUriParamService) {
    }

    public getAllCrosses = (pageMeta?: PageMeta) =>
        this.httpClient.getPage<Order>(`${environment.baseUrl}/${restUrl.crossesBase}`, pageMeta);
}
