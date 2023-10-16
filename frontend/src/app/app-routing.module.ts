import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NoughtsComponent} from './module/page/noughts/noughts.component';

const routes: Routes = [
    {path: 'noughts', component: NoughtsComponent},
    {path: '**', redirectTo: '/noughts'}
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {
        onSameUrlNavigation: 'reload'
    })],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
