import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { LoginComponent } from '../login/login.component'
import { routePaths } from './app-routing.constant'

const routes: Routes = [{path: '', redirectTo: routePaths.login, pathMatch: 'full'},
    {path: routePaths.login, component: LoginComponent}]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
