import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing'

import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { ExamMenuModule } from '../exam-menu.module'
import { ExamMenuComponent } from '../exam-menu.component'

describe(`${ExamMenuComponent.name} template`, () => {

    let component: ExamMenuComponent
    let fixture: ComponentFixture<ExamMenuComponent>

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                ExamMenuModule,
                NoopAnimationsModule
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        })

        fixture = TestBed.createComponent(ExamMenuComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    }))

    it('confirms exams menus existance', fakeAsync(() => {
        expect(getElement('#maturity-exam-button')).toBeDefined()
        expect(getElement('#pupp-exam-button')).toBeDefined()
    }))

    function getElement(selector: string): any {
        return fixture.debugElement.nativeElement.querySelector(selector)
    }
})
