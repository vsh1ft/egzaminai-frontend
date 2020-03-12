import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { TempComponent } from './temp.component'

@NgModule({
    declarations: [TempComponent],
    exports: [TempComponent],
    imports: [
        CommonModule
    ]
})
export class TempModule {
}
