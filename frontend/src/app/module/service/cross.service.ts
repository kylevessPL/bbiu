import {Injectable} from '@angular/core';
import {PageMeta} from '../model/page-meta';
import {BackendService} from './backend.service';
import {environment} from '../../../environments/environment';
import {restUrl} from '../../../environments/rest-url';
import {Cross} from '../model/cross';
import {map} from 'rxjs';
import {Material} from '../model/material.enum';

@Injectable({providedIn: 'root'})
export class CrossService {
    constructor(private backendService: BackendService) {
    }

    public getAllCrosses = (pageMeta?: PageMeta) =>
        this.backendService.getPage<Cross>(`${environment.baseUrl}/${restUrl.crossesBase}`, pageMeta)
            .pipe(map(items => this.mapCrosses(items)))

    public createCross = (cross: Cross) =>
        this.backendService.post<Cross>(`${environment.baseUrl}/${restUrl.crossesBase}`, cross)
            .pipe(map(item => this.mapCross(item)))

    public updateCross = (id: number, cross: Cross) =>
        this.backendService.put<Cross>(`${environment.baseUrl}/${restUrl.crossesBase}/${id}`, cross)
            .pipe(map(item => this.mapCross(item)))

    public deleteCross = (id: number) =>
        this.backendService.delete(`${environment.baseUrl}/${restUrl.crossesBase}/${id}`)

    private mapCrosses = (response: Cross) => {
        response.content = response.content.map(this.mapCross);
        return response;
    }

    private mapCross = (item: Cross) => {
        item.material = Material[item.material];
        return item;
    }
}
