import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { PuppExamComponent } from './pupp-exam.component'
import { MatTableModule } from '@angular/material/table'
import { CdkColumnDef } from '@angular/cdk/table'
import { MatIconModule } from '@angular/material/icon'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button'
import { MatSortModule } from '@angular/material/sort'
import { FormsModule } from '@angular/forms'
import { MatSelectModule } from '@angular/material/select'
import { ComponentRegistryService } from '../../../../service/registry/component-registry.service'


@NgModule({
    declarations: [PuppExamComponent],
    exports: [
        PuppExamComponent
    ],
    imports: [
        CommonModule,
        MatTableModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatSortModule,
        FormsModule,
        MatSelectModule
    ],
    providers: [
        CdkColumnDef,
        ComponentRegistryService
    ]
})
export class PuppExamModule {
    constructor(private componentRegistryService: ComponentRegistryService) {
        this.componentRegistryService.set('puppExamList', PuppExamComponent)
    }
}
