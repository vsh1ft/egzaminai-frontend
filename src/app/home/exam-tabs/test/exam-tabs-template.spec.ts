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


    describe('Button click', () => {
        beforeEach(() => {
            spyOn(component.componentName, 'emit')

        })

        describe('Maturity exam', () => {
            it('sends examList event', fakeAsync(() => {
                getElement('#exam-list-button').click()

                expect(component.componentName.emit).toHaveBeenCalledWith('examList')
            }))

            it('selects exam list button', fakeAsync(() => {
                getElement('#exam-list-button').click()
                fixture.detectChanges()

                expect(getElement('#exam-list-button').classList).toContain('selected')
            }))

            it('sends examPrograms event', fakeAsync(() => {
                getElement('#exam-programs-button').click()

                expect(component.componentName.emit).toHaveBeenCalledWith('examPrograms')
            }))

            it('selects examPrograms button', fakeAsync(() => {
                getElement('#exam-programs-button').click()
                fixture.detectChanges()

                expect(getElement('#exam-programs-button').classList).toContain('selected')
            }))

            it('sends examDates event', fakeAsync(() => {
                getElement('#exam-dates-button').click()

                expect(component.componentName.emit).toHaveBeenCalledWith('examDates')
            }))

            it('selects examDates button', fakeAsync(() => {
                getElement('#exam-dates-button').click()
                fixture.detectChanges()

                expect(getElement('#exam-dates-button').classList).toContain('selected')
            }))

            it('sends courseCredits event', fakeAsync(() => {
                getElement('#course-credits-button').click()

                expect(component.componentName.emit).toHaveBeenCalledWith('courseCredits')
            }))

            it('selects courseCredits button', fakeAsync(() => {
                getElement('#course-credits-button').click()
                fixture.detectChanges()

                expect(getElement('#course-credits-button').classList).toContain('selected')
            }))
        })

        describe('Pupp exam', () => {
            beforeEach(fakeAsync(() => {
                getElements('.mat-tab-label')[1].click()
                fixture.detectChanges()
                tick()
            }))

            it('sends puppExamList event', () => {
                getElement('#pupp-exam-list-button').click()

                expect(component.componentName.emit).toHaveBeenCalledWith('puppExamList')
            })

            it('selects puppExamList button', fakeAsync(() => {
                getElement('#pupp-exam-list-button').click()
                fixture.detectChanges()

                expect(getElement('#pupp-exam-list-button').classList).toContain('selected')
            }))

            it('sends puppExamPrograms event', () => {
                getElement('#pupp-exam-programs-button').click()

                expect(component.componentName.emit).toHaveBeenCalledWith('puppExamPrograms')
            })

            it('selects puppExamPrograms button', fakeAsync(() => {
                getElement('#pupp-exam-programs-button').click()
                fixture.detectChanges()

                expect(getElement('#pupp-exam-programs-button').classList).toContain('selected')
            }))


            it('sends puppExamDates event', () => {
                getElement('#pupp-exam-dates-button').click()

                expect(component.componentName.emit).toHaveBeenCalledWith('puppExamDates')
            })

            it('selects puppExamDates button', fakeAsync(() => {
                getElement('#pupp-exam-dates-button').click()
                fixture.detectChanges()

                expect(getElement('#pupp-exam-dates-button').classList).toContain('selected')
            }))
        })
    })

    function getElements(selector: string) {
        return fixture.debugElement.nativeElement.querySelectorAll(selector)
    }

    function getElement(selector: string): any {
        return fixture.debugElement.nativeElement.querySelector(selector)
    }
})
