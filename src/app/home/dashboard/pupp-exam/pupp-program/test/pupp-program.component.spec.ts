import { async, TestBed } from '@angular/core/testing'

import { PuppProgramComponent } from '../pupp-program.component'
import createSpyObj = jasmine.createSpyObj
import SpyObj = jasmine.SpyObj
import { PuppProgram } from '../pupp-program'
import { of } from 'rxjs'
import { CrudService } from '../../../../../service/crud/crud.service'

describe(`${PuppProgramComponent.name}`, () => {
    let component: PuppProgramComponent
    let serviceSpy: SpyObj<CrudService>

    const program = new PuppProgram('', 'name', 'url')
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            providers: [PuppProgramComponent,
                {
                    provide: CrudService,
                    useValue: createSpyObj(CrudService.name, ['retrieveAll', 'create', 'update', 'delete'])
                }
            ]
        })

        serviceSpy = TestBed.inject(CrudService) as SpyObj<CrudService>
        serviceSpy.retrieveAll.and.returnValue(of([program]))
        component = TestBed.inject(PuppProgramComponent)
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

        expect(serviceSpy.create).toHaveBeenCalledWith('/pupp-programs', component.newProgram)
    })

    it('updates program', () => {
        component.ngOnInit()

        component.updateProgram(program)

        expect(serviceSpy.update).toHaveBeenCalledWith('/pupp-programs', program)
    })

    it('deletes program', () => {
        component.ngOnInit()

        component.delete(program)

        expect(serviceSpy.delete).toHaveBeenCalledWith('/pupp-programs', program.id)
    })

    it('removes program row', () => {
        component.ngOnInit()

        component.delete(program)

        expect(component.programs.data.length).toEqual(0)
    })

})
