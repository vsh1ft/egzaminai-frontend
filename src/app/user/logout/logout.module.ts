import { NgModule } from '@angular/core'
import { LogoutComponent } from './logout.component'
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button'

@NgModule({
    declarations: [
        LogoutComponent
    ],
    imports: [
        MatIconModule,
        MatButtonModule
    ],
    exports: [
        LogoutComponent
    ]
})
export class LogoutModule {
}
