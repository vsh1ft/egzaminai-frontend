import { Component, OnInit, ViewChild } from '@angular/core'
import { examProgramsText } from './exam-date.constant'
import { MatTableDataSource } from '@angular/material/table'
import { MatSort } from '@angular/material/sort'
import { ExamDate } from './exam-date'
import { ExamDateService } from './service/exam-date.service'
import { MaturityExam } from '../maturity-exam'
import { ExamType } from './exam-type'

@Component({
    selector: 'exam-date',
    templateUrl: './exam-date.html'
})
export class ExamDateComponent implements OnInit {
    examListText = examProgramsText
    displayedColumns = ['name', 'type', 'dateTime', 'delete']
    dates: MatTableDataSource<ExamDate>
    emptyExam = new ExamDate(MaturityExam.CHEMISTRY, ExamType.NATIONAL_LEVEL, '')

    typeNames = Object.keys(ExamType)
    examNames = Object.keys(MaturityExam)
    maturityExamEnum = MaturityExam
    examTypeEnum = ExamType

    @ViewChild(MatSort, {static: true}) sort: MatSort

    constructor(private examProgramService: ExamDateService) {
    }

    ngOnInit(): void {
        this.examProgramService.getDates().subscribe(programs => {
            this.dates = new MatTableDataSource(programs)
            this.dates.sort = this.sort
        })
    }

}

