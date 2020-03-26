import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'

import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { PuppProgramComponent } from '../pupp-program.component'
import { PuppProgramModule } from '../pupp-program.module'
import { PuppProgram } from '../pupp-program'
import createSpyObj = jasmine.createSpyObj
import SpyObj = jasmine.SpyObj
import { of } from 'rxjs'
import { CrudService } from '../../../../../service/crud/crud.service'
import { By } from '@angular/platform-browser'
import { Subject } from '../../../maturity-exam/exam-programs/subject'
import objectContaining = jasmine.objectContaining

describe(`${PuppProgramComponent.name} template`, () => {

    let component: PuppProgramComponent
    let fixture: ComponentFixture<PuppProgramComponent>
    let serviceSpy: SpyObj<CrudService>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                PuppProgramModule,
                NoopAnimationsModule
            ],
            providers: [
                {
                    provide: CrudService,
                    useValue: createSpyObj(CrudService.name, ['retrieveAll', 'create', 'update', 'delete'])
                }
            ],
            declarations: [PuppProgramComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        })
        const musicProgram = new PuppProgram('id1', 'name1', 'url')
        const physicsProgram = new PuppProgram('id2', 'name2', 'url')
        serviceSpy = TestBed.inject(CrudService) as SpyObj<CrudService>
        serviceSpy.retrieveAll.and.returnValue(of([musicProgram, physicsProgram]))

        fixture = TestBed.createComponent(PuppProgramComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('creates template', async () => {
        expect(fixture.nativeElement.textContent).toBeDefined()
    })

    it('retrieves programs', () => {
        getElement('#add-icon').click()

        expect(serviceSpy.create).toHaveBeenCalledWith('/pupp-programs', component.newProgram)
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

        expect(serviceSpy.update).toHaveBeenCalledWith('/pupp-programs', objectContaining({name: 'value'}))
    })

    it('updates program url', () => {
        getElement('.program-url').value = 'value'
        getElement('.program-url').dispatchEvent(new Event('input'))
        fixture.detectChanges()

        expect(serviceSpy.update).toHaveBeenCalledWith('/pupp-programs', objectContaining({programUrl: 'value'}))
    })

    function getElement(selector: string): any {
        return fixture.debugElement.nativeElement.querySelector(selector)
    }

    function getElements(selector: string) {
        return fixture.debugElement.nativeElement.querySelectorAll(selector)
    }

})
