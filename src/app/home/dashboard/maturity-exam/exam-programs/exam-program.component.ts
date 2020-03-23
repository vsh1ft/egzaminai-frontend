import { Component, OnInit, ViewChild } from '@angular/core'
import { examProgramsText } from './exam-program.constant'
import { MatTableDataSource } from '@angular/material/table'
import { MatSort } from '@angular/material/sort'
import { ExamProgram } from './exam-program'
import { ExamProgramService } from './service/exam-program.service'
import { Subject } from './subject'

@Component({
    selector: 'exam-program',
    templateUrl: './exam-program.html'
})
export class ExamProgramComponent implements OnInit {
    examListText = examProgramsText
    displayedColumns = ['name', 'subject', 'programUrl', 'delete']
    programs: MatTableDataSource<ExamProgram>
    emptyExam = new ExamProgram('', Subject.ART, '')
    years = [2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013]

    subjectNames = Object.keys(Subject)
    subjectTypeEnum = Subject

    @ViewChild(MatSort, {static: true}) sort: MatSort

    constructor(private examProgramService: ExamProgramService) {
    }

    ngOnInit(): void {
        this.examProgramService.getPrograms().subscribe(programs => {
            this.programs = new MatTableDataSource(programs)
            this.programs.sort = this.sort
        })
    }

}

