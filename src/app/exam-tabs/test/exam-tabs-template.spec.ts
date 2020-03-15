import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing'

import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { ExamTabsModule } from '../exam-tabs.module'
import { ExamTabsComponent } from '../exam-tabs.component'

describe(`${ExamTabsComponent.name} template`, () => {

    let component: ExamTabsComponent
    let fixture: ComponentFixture<ExamTabsComponent>

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                ExamTabsModule,
                NoopAnimationsModule
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        })

        fixture = TestBed.createComponent(ExamTabsComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    }))

    it('confirms exams tab existance', fakeAsync(() => {
        expect(getElements('.mat-tab-label').length).toEqual(2)
    }))

    function getElements(selector: string) {
        return fixture.debugElement.nativeElement.querySelectorAll(selector)
    }

})
