import {HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {tap} from 'rxjs/operators';
import {Injectable} from '@angular/core';

@Injectable()
export class HttpResponseInterceptor implements HttpInterceptor {
    private readonly _iso8601 = /^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(\.\d+)?(([+-]\d\d:\d\d)|Z)?$/;

    intercept = (req: HttpRequest<any>, next: HttpHandler) => next.handle(req).pipe(
        tap(event => {
            if (event instanceof HttpResponse) {
                const body = event.body;
                this.convertToDate(body);
            }
        }),
    );

    private convertToDate(body) {
        if (body == null || typeof body !== 'object') {
            return body;
        }
        for (const key of Object.keys(body)) {
            const value = body[key];
            if (this.isIso8601(value)) {
                body[key] = new Date(value);
            } else if (typeof value === 'object') {
                this.convertToDate(value);
            }
        }
    }

    private isIso8601 = (value) => value != null && this._iso8601.test(value);
}
