import {Injectable} from '@angular/core';
import {PageMeta} from '../models/page-meta';
import {EncodeUriParamService} from './encode-uri-param.service';
import {environment} from '../../../environments/environment';
import {restUrl} from '../../../environments/rest-url';
import {Product} from '../models/product';

@Injectable({providedIn: 'root'})
export class NoughtService {
    constructor(private httpClient: EncodeUriParamService) {
    }

    public getAllNoughts = (pageMeta?: PageMeta) =>
        this.httpClient.getPage<Product>(`${environment.baseUrl}/${restUrl.noughtsBase}`, pageMeta);
}
