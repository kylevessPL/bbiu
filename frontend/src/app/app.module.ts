import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from './material.module';
import {NgModule} from '@angular/core';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatToolbarModule} from '@angular/material/toolbar';

import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {DataTableComponent} from './module/component/data-table/data-table.component';
import {FooterComponent} from './module/component/footer/footer.component';
import {HttpErrorInterceptor} from './config/security/interceptor/http-error.interceptor';
import {HashLocationStrategy, LocationStrategy, NgOptimizedImage} from '@angular/common';
import {MessageDialogComponent} from './module/component/message-dialog/message-dialog.component';
import {GlobalService} from './module/service/global.service';
import {TypeSafeMatCellDefDirective} from './module/directive/type-safe-mat-cell-def.directive';
import {DateFormatterPipe} from './module/pipe/date-formatter.pipe';
import {HttpResponseInterceptor} from './config/security/interceptor/http-response.interceptor';
import {BooleanFormatterPipe} from './module/pipe/boolean-formatter.pipe';
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatSelectModule} from '@angular/material/select';
import {MatBadgeModule} from '@angular/material/badge';
import {NoughtsComponent} from './module/page/noughts/noughts.component';
import {DataPropertyGetterPipe} from './module/pipe/data-property-getter.pipe';
import {NoughtsListComponent} from './module/component/noughts-list/noughts-list.component';

@NgModule({
    declarations: [
        AppComponent,
        NoughtsComponent,
        NoughtsListComponent,
        FooterComponent,
        DataTableComponent,
        MessageDialogComponent,
        TypeSafeMatCellDefDirective,
        DataPropertyGetterPipe,
        DateFormatterPipe,
        BooleanFormatterPipe
    ],
    imports: [
        MatChipsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        BrowserModule,
        AppRoutingModule,
        MatIconModule,
        MatCardModule,
        MatButtonModule,
        MatProgressSpinnerModule,
        MatToolbarModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule,
        MatSelectModule,
        MatBadgeModule,
        NgOptimizedImage
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpErrorInterceptor,
            deps: [GlobalService],
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpResponseInterceptor,
            multi: true
        },
        {
            provide: LocationStrategy,
            useClass: HashLocationStrategy
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
