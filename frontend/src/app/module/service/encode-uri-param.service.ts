import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {share} from 'rxjs/operators';
import {PageMeta, pageMetaDefault} from '../model/page-meta';

@Injectable({providedIn: 'root'})
export class EncodeUriParamService {
    constructor(private httpClient: HttpClient) {
    }

    public get = <T>(url: string, param?: string) => this.httpClient
        .get<T>(url + '/' + encodeURIComponent(param))
        .pipe(share())

    public getPage = <T>(url: string, pageMeta: PageMeta = pageMetaDefault) => this.httpClient
        .get<T>(url, {params: this.getPageMetaParams(pageMeta)})
        .pipe(share())

    public post = <T>(url: string, body: object, param?: string) => this.httpClient
        .post<T>(url + encodeURIComponent(param), body)
        .pipe(share())

    public delete = (url: string, param?: string) => this.httpClient
        .delete(url + '/' + encodeURIComponent(param), {observe: 'response'})
        .pipe(share())

    private getPageMetaParams = (pageMeta: PageMeta) => {
        let params = new HttpParams()
            .set('page', `${pageMeta.page}`)
            .set('size', `${pageMeta.size}`)
            .set('sort', `${pageMeta.sort},${pageMeta.sortDirection},ignorecase`);
        if (pageMeta.filter) {
            for (const key of Object.keys(pageMeta.filter)) {
                const value = pageMeta.filter[key];
                params = params.set(key, value);
            }
        }
        return params;
    }
}
