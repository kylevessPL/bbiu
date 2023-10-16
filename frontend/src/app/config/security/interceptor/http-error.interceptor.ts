import {HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {GlobalService} from '../../../module/service/global.service';
import {Injectable} from '@angular/core';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
    constructor(public globalService: GlobalService) {
    }

    intercept = (request: HttpRequest<any>, next: HttpHandler) => next.handle(request).pipe(
        catchError((error: HttpErrorResponse) => {
            if (error.url && (error.status !== 401 || error.url.endsWith('/auth'))) {
                this.globalService.httpErrorStatus.next(error);
            }
            return throwError(() => error);
        })
    );
}
