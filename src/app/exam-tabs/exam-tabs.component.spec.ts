import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { ExamTabsComponent } from './exam-tabs.component'

describe('ExamTabsComponent', () => {
    let component: ExamTabsComponent
    let fixture: ComponentFixture<ExamTabsComponent>

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ExamTabsComponent]
        })
            .compileComponents()
    }))

    beforeEach(() => {
        fixture = TestBed.createComponent(ExamTabsComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
