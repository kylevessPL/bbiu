import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from './material.module';
import {NgModule} from '@angular/core';
import {MAT_DIALOG_DEFAULT_OPTIONS, MatDialogConfig, MatDialogModule} from '@angular/material/dialog';
import {
    MAT_FORM_FIELD_DEFAULT_OPTIONS,
    MatFormFieldDefaultOptions,
    MatFormFieldModule
} from '@angular/material/form-field';
import {MatToolbarModule} from '@angular/material/toolbar';

import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {DataTableComponent} from './module/component/data-table/data-table.component';
import {FooterComponent} from './module/component/footer/footer.component';
import {HttpErrorInterceptor} from './config/security/interceptor/http-error.interceptor';
import {HashLocationStrategy, LocationStrategy, NgOptimizedImage} from '@angular/common';
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
import {CrossesComponent} from './module/page/crosses/crosses.component';
import {CrossesFilterComponent} from './module/component/crosses-filter/crosses-filter.component';
import {ConfirmationDialogComponent} from './module/component/confirmation-dialog/confirmation-dialog.component';
import {MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarConfig} from '@angular/material/snack-bar';
import {CrossFormDialogComponent} from './module/component/cross-form-dialog/cross-form-dialog.component';
import {
    NGX_MAT_DATE_FORMATS,
    NgxMatDateFormats,
    NgxMatDatetimePickerModule
} from '@angular-material-components/datetime-picker';
import {NgxMatMomentModule} from '@angular-material-components/moment-adapter';
import {environment} from '../environments/environment';
import {NgxNumbersOnlyDirectiveModule} from 'ngx-numbers-only-directive';
import {NoughtFormComponent} from './module/component/nought-form/nought-form.component';
import {SelectionListComponent} from './module/component/selection-list/selection-list.component';

@NgModule({
    declarations: [
        AppComponent,
        NoughtsComponent,
        NoughtFormComponent,
        CrossesComponent,
        CrossFormDialogComponent,
        CrossesFilterComponent,
        FooterComponent,
        DataTableComponent,
        SelectionListComponent,
        ConfirmationDialogComponent,
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
        MatSelectModule,
        MatBadgeModule,
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule,
        NgxMatDatetimePickerModule,
        NgxMatMomentModule,
        NgxNumbersOnlyDirectiveModule,
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
        },
        {
            provide: NGX_MAT_DATE_FORMATS,
            useValue: {
                parse: {
                    dateInput: environment.datePickerFormat,
                },
                display: {
                    dateInput: environment.datePickerFormat,
                    monthYearLabel: 'MMM YYYY',
                    dateA11yLabel: 'LL',
                    monthYearA11yLabel: 'MMMM YYYY',
                },
            } as NgxMatDateFormats
        },
        {
            provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
            useValue: {
                appearance: 'outline'
            } as MatFormFieldDefaultOptions
        },
        {
            provide: MAT_DIALOG_DEFAULT_OPTIONS,
            useValue: {
                autoFocus: false
            } as MatDialogConfig
        },
        {
            provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
            useValue: {
                duration: 3000
            } as MatSnackBarConfig
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
