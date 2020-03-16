import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'

import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { PuppProgramComponent } from '../pupp-program.component'
import { PuppProgramModule } from '../pupp-program.module'
import { PuppProgram } from '../pupp-program'
import { PuppProgramService } from '../service/pupp-program.service'
import createSpyObj = jasmine.createSpyObj
import SpyObj = jasmine.SpyObj
import { of } from 'rxjs'

describe(`${PuppProgramComponent.name} template`, () => {

    let component: PuppProgramComponent
    let fixture: ComponentFixture<PuppProgramComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                PuppProgramModule,
                NoopAnimationsModule
            ],
            providers: [
                {
                    provide: PuppProgramService,
                    useValue: createSpyObj(PuppProgramService.name, ['getPrograms'])
                }
            ],
            declarations: [PuppProgramComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        })
        const musicProgram = new PuppProgram('name1', 'url')
        const physicsProgram = new PuppProgram('name2', 'url');
        (TestBed.inject(PuppProgramService) as SpyObj<PuppProgramService>).getPrograms.and.returnValue(of([musicProgram, physicsProgram]))

        fixture = TestBed.createComponent(PuppProgramComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('creates template', async () => {
        expect(fixture.nativeElement.textContent).toBeDefined()
    })

})
