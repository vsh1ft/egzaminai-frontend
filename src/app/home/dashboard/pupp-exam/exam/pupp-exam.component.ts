import { Component, OnInit, ViewChild } from '@angular/core'
import { puppExamsText } from './pupp-exam.constant'
import { MatTableDataSource } from '@angular/material/table'
import { MatSort } from '@angular/material/sort'
import { PuppExam } from './pupp-exam'
import { PuppExamName } from '../pupp-exam-name'
import cloneDeep from 'lodash/cloneDeep'
import { CrudService } from '../../../../service/crud/crud.service'

@Component({
    selector: 'pupp-exam',
    templateUrl: './pupp-exam.html'
})
export class PuppExamComponent implements OnInit {
    examsText = puppExamsText
    displayedColumns = ['name', 'year', 'creditUrl', 'delete']
    exams: MatTableDataSource<PuppExam>
    newExam = new PuppExam('id', PuppExamName.FOREIGN_LANGUAGE_VERBAL, 0, '')
    years = [2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013]

    examNames = Object.keys(PuppExamName)
    examNamesEnum = PuppExamName

    private path = '/pupp-exams'

    @ViewChild(MatSort, {static: true}) sort: MatSort

    constructor(private service: CrudService) {
    }

    ngOnInit(): void {
        this.service.retrieveAll<PuppExam>(this.path).subscribe(programs => {
            this.exams = new MatTableDataSource(programs)
            this.exams.sort = this.sort
        })
    }

    addRow() {
        this.exams.data.push(cloneDeep(this.newExam))
        this.exams.data = this.exams.data.slice()

        this.newExam.examUrl = ''
    }

    updateExam(exam: PuppExam) {
        this.service.update(this.path, exam)
    }

    saveNewExam() {
        this.service.create(this.path, this.newExam)
    }

    delete(exam: PuppExam) {
        this.service.delete(this.path, exam.id)
        this.exams.data = this.exams.data.filter(i => i !== exam)
    }

}

