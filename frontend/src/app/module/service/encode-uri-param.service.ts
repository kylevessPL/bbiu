import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {share} from 'rxjs/operators';
import {PageMeta, pageMetaDefault} from '../models/page-meta';

@Injectable({providedIn: 'root'})
export class EncodeUriParamService {
    constructor(private httpClient: HttpClient) {
    }

    public get = <T>(url: string, param?: string) => this.httpClient
        .get<T>(url + '/' + encodeURIComponent(param))
        .pipe(share());

    public getPage = <T>(url: string, pageMeta: PageMeta = pageMetaDefault) => this.httpClient
        .get<T>(url, {params: this.getPageMetaParams(pageMeta)})
        .pipe(share());

    public post = <T>(url: string, body: object, param?: string) => this.httpClient
        .post<T>(url + encodeURIComponent(param), body)
        .pipe(share());

    public delete = (url: string, param?: string) => this.httpClient
        .delete(url + '/' + encodeURIComponent(param), {observe: 'response'})
        .pipe(share());

    private getPageMetaParams = (pageMeta: PageMeta) => new HttpParams({
        fromObject: {
            page: `${pageMeta.page}`,
            size: `${pageMeta.size}`,
            sort: `${pageMeta.sort},${pageMeta.sortDirection},ignorecase`,
        }
    });
}
