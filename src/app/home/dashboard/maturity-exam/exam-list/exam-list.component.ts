import { Component, OnInit, ViewChild } from '@angular/core'
import { examListText } from './exam-list.constant'
import cloneDeep from 'lodash/cloneDeep'
import { MatTable, MatTableDataSource } from '@angular/material/table'
import { MatSort } from '@angular/material/sort'
import { Exam } from './type/exam'
import { MaturityExam } from '../maturity-exam'
import { ExamType } from '../exam-dates/exam-type'
import { CrudService } from '../../../../service/crud/crud.service'

@Component({
    selector: 'exam-list',
    templateUrl: './exam-list.html'
})
export class ExamListComponent implements OnInit {

    examListText = examListText
    displayedColumns = ['name', 'year', 'type', 'examUrl', 'answerUrl', 'delete']
    maturityExams: MatTableDataSource<Exam>
    newExam = new Exam('id', MaturityExam.LITHUANIAN_LANGUAGE, 0, ExamType.NATIONAL_LEVEL, '', '')
    years = [2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013]

    typeNames = Object.keys(ExamType)
    examNames = Object.keys(MaturityExam)
    maturityExamEnum = MaturityExam
    examTypeEnum = ExamType

    private path = '/exams'

    @ViewChild(MatSort, {static: true}) sort: MatSort
    @ViewChild(MatTable, {static: true}) table: MatTable<Exam>

    constructor(private service: CrudService) {
    }

    ngOnInit(): void {
        this.service.retrieveAll<Exam>(this.path).subscribe(exams => {
            this.maturityExams = new MatTableDataSource(exams)
            this.maturityExams.sort = this.sort
        })
    }

    addRow() {
        this.maturityExams.data.push(cloneDeep(this.newExam))
        this.maturityExams.data = this.maturityExams.data.slice()

        this.newExam.answerUrl = ''
        this.newExam.examUrl = ''
    }

    updateExam(exam: Exam) {
        this.service.update(this.path, exam)
    }

    saveNewExam() {
        this.service.create(this.path, this.newExam)
    }

    delete(exam: Exam) {
        this.service.delete(this.path, exam.id)
        this.maturityExams.data = this.maturityExams.data.filter(i => i !== exam)
    }

}

