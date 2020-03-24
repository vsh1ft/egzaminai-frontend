import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'

import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { PuppDateComponent } from '../pupp-date.component'
import { PuppDateModule } from '../pupp-date.module'
import { PuppDate } from '../pupp-date'
import { PuppDateService } from '../service/pupp-date.service'
import { of } from 'rxjs'
import { PuppExamName } from '../../pupp-exam-name'
import createSpyObj = jasmine.createSpyObj
import SpyObj = jasmine.SpyObj

describe(`${PuppDateComponent.name} template`, () => {

    let component: PuppDateComponent
    let fixture: ComponentFixture<PuppDateComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                PuppDateModule,
                NoopAnimationsModule
            ],
            providers: [
                {
                    provide: PuppDateService,
                    useValue: createSpyObj(PuppDateService.name, ['getDates'])
                }
            ],
            declarations: [PuppDateComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        })
        const musicProgram = new PuppDate(PuppExamName.LITHUANIAN_LANGUAGE_WRITING_I,  'date')
        const physicsProgram = new PuppDate(PuppExamName.LITHUANIAN_LANGUAGE_WRITING_II,  'date');
        (TestBed.inject(PuppDateService) as SpyObj<PuppDateService>).getDates.and.returnValue(of([musicProgram, physicsProgram]))

        fixture = TestBed.createComponent(PuppDateComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('creates template', async () => {
        expect(fixture.nativeElement.textContent).toBeDefined()
    })

})
