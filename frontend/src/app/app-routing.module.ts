import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NoughtsComponent} from './module/page/noughts/noughts.component';
import {CrossesComponent} from './module/page/crosses/crosses.component';

const routes: Routes = [
    {path: 'noughts', component: NoughtsComponent},
    {path: 'crosses', component: CrossesComponent},
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
