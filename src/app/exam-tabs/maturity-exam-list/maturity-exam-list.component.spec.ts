import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { MaturityExamListComponent } from './maturity-exam-list.component'

describe('MaturityExamListComponent', () => {
    let component: MaturityExamListComponent
    let fixture: ComponentFixture<MaturityExamListComponent>

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MaturityExamListComponent]
        })
            .compileComponents()
    }))

    beforeEach(() => {
        fixture = TestBed.createComponent(MaturityExamListComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
