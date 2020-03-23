import { Component, OnInit, ViewChild } from '@angular/core'
import { examListText } from './exam-list.constant'
import { MatTableDataSource } from '@angular/material/table'
import { MatSort } from '@angular/material/sort'
import { Exam } from './type/exam'
import { ExamListService } from './service/exam-list.service'
import { MaturityExam } from '../maturity-exam'
import { ExamType } from '../exam-dates/exam-type'

@Component({
    selector: 'exam-list',
    templateUrl: './exam-list.html'
})
export class ExamListComponent implements OnInit {
    examListText = examListText
    displayedColumns = ['name', 'year', 'type', 'examUrl', 'answerUrl', 'delete']
    maturityExams: MatTableDataSource<Exam>
    emptyExam = new Exam(MaturityExam.LITHUANIAN_LANGUAGE, 0, ExamType.NATIONAL_LEVEL, '', '')
    years = [2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013]

    typeNames = Object.keys(ExamType)
    examNames = Object.keys(MaturityExam)
    maturityExamEnum = MaturityExam
    examTypeEnum = ExamType

    @ViewChild(MatSort, {static: true}) sort: MatSort

    constructor(private examListService: ExamListService) {
    }

    ngOnInit(): void {
        this.examListService.getExams().subscribe(exams => {
            this.maturityExams = new MatTableDataSource(exams)
            this.maturityExams.sort = this.sort
        })
    }

}

