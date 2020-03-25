import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing'

import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { ExamProgramComponent } from '../exam-program.component'
import { ExamProgram } from '../exam-program'
import { of } from 'rxjs'
import { Subject } from '../subject'
import createSpyObj = jasmine.createSpyObj
import SpyObj = jasmine.SpyObj
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatSelectModule } from '@angular/material/select'
import { FormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common'
import { MatTableModule } from '@angular/material/table'
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button'
import { MatSortModule } from '@angular/material/sort'
import { CrudService } from '../../../../../service/crud/crud.service'
import { By } from '@angular/platform-browser'
import objectContaining = jasmine.objectContaining

describe(`${ExamProgramComponent.name} template`, () => {

    let component: ExamProgramComponent
    let fixture: ComponentFixture<ExamProgramComponent>
    let serviceSpy: SpyObj<CrudService>

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
                    provide: CrudService,
                    useValue: createSpyObj(CrudService.name, ['retrieveAll', 'create', 'update', 'delete'])
                }
            ],
            declarations: [ExamProgramComponent]
        })
        const musicProgram = new ExamProgram('id1', 'name1', Subject.ART, 'url')
        const physicsProgram = new ExamProgram('id2', 'name2', Subject.HISTORY, 'url')
        serviceSpy = TestBed.inject(CrudService) as SpyObj<CrudService>
        serviceSpy.retrieveAll.and.returnValue(of([musicProgram, physicsProgram]))

        fixture = TestBed.createComponent(ExamProgramComponent)
        component = fixture.componentInstance
        component.ngOnInit()
        fixture.detectChanges()
    })

    it('retrieves programs', () => {
        getElement('#add-icon').click()

        expect(serviceSpy.create).toHaveBeenCalledWith('/programs', component.newProgram)
    })

    it('adds new program row', () => {
        getElement('#add-icon').click()

        expect(getElements('mat-row').length).toEqual(3)
    })

    it('removes program row', () => {
        getElement('#delete-icon').click()
        fixture.detectChanges()

        expect(getElements('mat-row').length).toEqual(1)
    })

    it('updates program name', () => {
        getElement('.program-name').value = 'value'
        getElement('.program-name').dispatchEvent(new Event('input'))

        expect(serviceSpy.update).toHaveBeenCalledWith('/programs', objectContaining({name: 'value'}))
    })

    it('updates program subject', () => {
        getElements('.mat-select')[0].click()
        fixture.detectChanges()
        fixture.debugElement.queryAll(By.css('.mat-option'))[1].nativeElement.click()
        fixture.detectChanges()

        expect(serviceSpy.update).toHaveBeenCalledWith('/programs', objectContaining({subject: Object.keys(Subject)[1]}))
    })

    it('updates program url', () => {
        getElement('.program-url').value = 'value'
        getElement('.program-url').dispatchEvent(new Event('input'))
        fixture.detectChanges()

        expect(serviceSpy.update).toHaveBeenCalledWith('/programs', objectContaining({programUrl: 'value'}))
    })

    function getElement(selector: string): any {
        return fixture.debugElement.nativeElement.querySelector(selector)
    }

    function getElements(selector: string) {
        return fixture.debugElement.nativeElement.querySelectorAll(selector)
    }

})
