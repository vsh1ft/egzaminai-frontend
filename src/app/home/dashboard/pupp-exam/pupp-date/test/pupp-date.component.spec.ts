import { async, TestBed } from '@angular/core/testing'

import { PuppDateComponent } from '../pupp-date.component'
import { PuppDateService } from '../service/pupp-date.service'
import { PuppDate } from '../pupp-date'
import { of } from 'rxjs'
import { PuppExamName } from '../../pupp-exam-name'
import createSpyObj = jasmine.createSpyObj
import SpyObj = jasmine.SpyObj

describe(`${PuppDateComponent.name}`, () => {
    let component: PuppDateComponent
    let serviceSpy: SpyObj<PuppDateService>
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            providers: [PuppDateComponent,
                {
                    provide: PuppDateService,
                    useValue: createSpyObj(PuppDateService.name, ['getDates'])
                }
            ]
        })

        serviceSpy = TestBed.inject(PuppDateService) as SpyObj<PuppDateService>
        serviceSpy.getDates.and.returnValue(of([new PuppDate(PuppExamName.MATH, 'date')]))
        component = TestBed.inject(PuppDateComponent)
    }))

    describe('Initialization', () => {
        it('retrieves dates', () => {
            component.ngOnInit()

            expect(component.dates).toBeDefined()
        })
    })

})
