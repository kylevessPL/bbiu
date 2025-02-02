import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {share} from 'rxjs/operators';
import {PageMeta, pageMetaDefault} from '../model/page-meta';

@Injectable({providedIn: 'root'})
export class BackendService {
    constructor(private httpClient: HttpClient) {
    }

    public get = <T>(url: string) => this.httpClient
        .get<T>(url)
        .pipe(share())

    public getPage = <T>(url: string, pageMeta: PageMeta = pageMetaDefault) => this.httpClient
        .get<T>(url, {params: this.getPageMetaParams(pageMeta)})
        .pipe(share())

    public post = <T>(url: string, body: object) => this.httpClient
        .post<T>(url, body)
        .pipe(share())

    public put = <T>(url: string, body: object) => this.httpClient
        .put<T>(url, body)
        .pipe(share())

    public delete = (url: string) => this.httpClient
        .delete(url, {observe: 'response'})
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
