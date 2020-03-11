import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { LoginComponent } from '../login/login.component'
import { routePaths } from './app-routing.constant'
import { HomeComponent } from '../home/home.component'
import { AuthGuard } from './guard/auth.guard'
import { SignUpComponent } from '../sign-up/sign-up.component'

const routes: Routes = [
    {path: '', component: HomeComponent, canActivate: [AuthGuard]},
    {path: routePaths.login, component: LoginComponent},
    {path: routePaths.signUp, component: SignUpComponent}
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
