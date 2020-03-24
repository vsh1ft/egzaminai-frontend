import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing'

import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { ExamProgramComponent } from '../exam-program.component'
import { ExamProgramModule } from '../exam-program.module'
import { ExamProgram } from '../exam-program'
import { ExamProgramService } from '../service/exam-program.service'
import { of } from 'rxjs'
import { Subject } from '../subject'
import createSpyObj = jasmine.createSpyObj
import SpyObj = jasmine.SpyObj
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatSelectModule } from '@angular/material/select'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common'
import { MatTableModule } from '@angular/material/table'
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button'
import { MatSortModule } from '@angular/material/sort'
import { By } from '@angular/platform-browser'

describe(`${ExamProgramComponent.name} template`, () => {

    let component: ExamProgramComponent
    let fixture: ComponentFixture<ExamProgramComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                CommonModule,
                MatTableModule,
                MatIconModule,
                MatFormFieldModule,
                MatInputModule,
                MatButtonModule,
                MatSortModule,
                FormsModule,
                MatSelectModule,
                NoopAnimationsModule
            ],
            providers: [
                {
                    provide: ExamProgramService,
                    useValue: createSpyObj(ExamProgramService.name, ['getPrograms'])
                }
            ],
            declarations: [ExamProgramComponent]
        })
        const musicProgram = new ExamProgram('name1', Subject.ART, 'url')
        const physicsProgram = new ExamProgram('name2', Subject.HISTORY, 'url');
        (TestBed.inject(ExamProgramService) as SpyObj<ExamProgramService>).getPrograms.and.returnValue(of([musicProgram, physicsProgram]))

        fixture = TestBed.createComponent(ExamProgramComponent)
        component = fixture.componentInstance
        component.ngOnInit()
    })

})
