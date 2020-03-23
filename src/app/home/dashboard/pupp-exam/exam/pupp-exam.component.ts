import { Component, OnInit, ViewChild } from '@angular/core'
import { puppExamsText } from './pupp-exam.constant'
import { MatTableDataSource } from '@angular/material/table'
import { MatSort } from '@angular/material/sort'
import { PuppExam } from './pupp-exam'
import { PuppExamService } from './service/pupp-exam.service'
import { PuppExamName } from '../pupp-exam-name'

@Component({
    selector: 'pupp-exam',
    templateUrl: './pupp-exam.html'
})
export class PuppExamComponent implements OnInit {
    examsText = puppExamsText
    displayedColumns = ['name', 'year', 'creditUrl', 'delete']
    exams: MatTableDataSource<PuppExam>
    emptyExam = new PuppExam(PuppExamName.FOREIGN_LANGUAGE_VERBAL, 0, '')
    years = [2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013]

    examNames = Object.keys(PuppExamName)
    examNamesEnum = PuppExamName

    @ViewChild(MatSort, {static: true}) sort: MatSort

    constructor(private examProgramService: PuppExamService) {
    }

    ngOnInit(): void {
        this.examProgramService.getExams().subscribe(programs => {
            this.exams = new MatTableDataSource(programs)
            this.exams.sort = this.sort
        })
    }

}

