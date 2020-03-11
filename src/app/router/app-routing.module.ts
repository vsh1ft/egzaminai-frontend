import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { LoginComponent } from '../login/login.component'
import { routePaths } from './app-routing.constant'
import { HomeComponent } from '../home/home.component'
import { AuthGuard } from './guard/auth.guard'

const routes: Routes = [
    {path: '', component: HomeComponent, canActivate: [AuthGuard]},
    {path: routePaths.login, component: LoginComponent}
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
