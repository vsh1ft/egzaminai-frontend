import { Component, OnInit, ViewChild } from '@angular/core'
import { examDatesText } from './exam-date.constant'
import { MatTableDataSource } from '@angular/material/table'
import { MatSort } from '@angular/material/sort'
import { ExamDate } from './exam-date'
import cloneDeep from 'lodash/cloneDeep'
import { MaturityExam } from '../maturity-exam'
import { ExamType } from './exam-type'
import { CrudService } from '../../../../service/crud/crud.service'

@Component({
    selector: 'exam-date',
    templateUrl: './exam-date.html'
})
export class ExamDateComponent implements OnInit {
    examDatesText = examDatesText
    displayedColumns = ['name', 'type', 'dateTime', 'delete']
    dates: MatTableDataSource<ExamDate>
    newDate = new ExamDate('', MaturityExam.CHEMISTRY, ExamType.NATIONAL_LEVEL, '')

    typeNames = Object.keys(ExamType)
    examNames = Object.keys(MaturityExam)
    maturityExamEnum = MaturityExam
    examTypeEnum = ExamType

    private path = '/dates'

    @ViewChild(MatSort, {static: true}) sort: MatSort

    constructor(private service: CrudService) {
    }

    ngOnInit(): void {
        this.service.retrieveAll<ExamDate>(this.path).subscribe(programs => {
            this.dates = new MatTableDataSource(programs)
            this.dates.sort = this.sort
        })
    }

    addRow() {
        this.dates.data.push(cloneDeep(this.newDate))
        this.dates.data = this.dates.data.slice()
    }

    updateDate(date: ExamDate) {
        this.service.update(this.path, date)
    }

    saveNewDate() {
        this.service.create(this.path, this.newDate)
    }

    delete(date: ExamDate) {
        this.service.delete(this.path, date.id)
        this.dates.data = this.dates.data.filter(i => i !== date)
    }

}

