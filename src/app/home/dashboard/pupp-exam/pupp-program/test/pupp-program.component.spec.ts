import { async, TestBed } from '@angular/core/testing'

import { PuppProgramComponent } from '../pupp-program.component'
import { PuppProgramService } from '../service/pupp-program.service'
import createSpyObj = jasmine.createSpyObj
import SpyObj = jasmine.SpyObj
import { PuppProgram } from '../pupp-program'
import { of } from 'rxjs'

describe(`${PuppProgramComponent.name}`, () => {
    let component: PuppProgramComponent
    let serviceSpy: SpyObj<PuppProgramService>
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            providers: [PuppProgramComponent,
                {
                    provide: PuppProgramService,
                    useValue: createSpyObj(PuppProgramService.name, ['getPrograms'])
                }
            ]
        })

        serviceSpy = TestBed.inject(PuppProgramService) as SpyObj<PuppProgramService>
        serviceSpy.getPrograms.and.returnValue(of([new PuppProgram('name', 'url')]))
        component = TestBed.inject(PuppProgramComponent)
    }))

    describe('Initialization', () => {
        it('retrieves programs', () => {
            component.ngOnInit()

            expect(component.programs).toBeDefined()
        })
    })

})
