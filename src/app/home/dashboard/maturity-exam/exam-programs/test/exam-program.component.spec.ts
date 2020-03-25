import { async, TestBed } from '@angular/core/testing'

import { ExamProgramComponent } from '../exam-program.component'
import { ExamProgram } from '../exam-program'
import { of } from 'rxjs'
import { Subject } from '../subject'
import createSpyObj = jasmine.createSpyObj
import SpyObj = jasmine.SpyObj
import { CrudService } from '../../../../../service/crud/crud.service'

describe(`${ExamProgramComponent.name}`, () => {
    let component: ExamProgramComponent
    let serviceSpy: SpyObj<CrudService>

    const program = new ExamProgram('id', 'name', Subject.ART, 'url')

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            providers: [ExamProgramComponent,
                {
                    provide: CrudService,
                    useValue: createSpyObj(CrudService.name, ['retrieveAll', 'create', 'update', 'delete'])
                }
            ]
        })

        serviceSpy = TestBed.inject(CrudService) as SpyObj<CrudService>
        serviceSpy.retrieveAll.and.returnValue(of([program]))
        component = TestBed.inject(ExamProgramComponent)
    }))

    describe('Initialization', () => {
        it('retrieves programs', () => {
            component.ngOnInit()

            expect(component.programs).toBeDefined()
        })
    })

    it('adds an program row', () => {
        component.ngOnInit()

        component.addRow()

        expect(component.programs.data.length).toEqual(2)
        expect(component.programs.data[1]).toEqual(component.newProgram)
    })

    it('clears urls after adding a new row', () => {
        component.ngOnInit()
        component.newProgram.programUrl = 'url2'

        component.addRow()

        expect(component.newProgram.programUrl).toEqual('')
    })

    it('saves new program', () => {
        component.ngOnInit()

        component.saveNewProgram()

        expect(serviceSpy.create).toHaveBeenCalledWith('/programs', component.newProgram)
    })

    it('updates program', () => {
        component.ngOnInit()

        component.updateProgram(program)

        expect(serviceSpy.update).toHaveBeenCalledWith('/programs', program)
    })

    it('deletes program', () => {
        component.ngOnInit()

        component.delete(program)

        expect(serviceSpy.delete).toHaveBeenCalledWith('/programs', program.id)
    })

    it('removes program row', () => {
        component.ngOnInit()

        component.delete(program)

        expect(component.programs.data.length).toEqual(0)
    })

})
