import { Component, OnInit, ViewChild } from '@angular/core'
import { examProgramsText } from './exam-program.constant'
import { MatTableDataSource } from '@angular/material/table'
import { MatSort } from '@angular/material/sort'
import { ExamProgram } from './exam-program'
import cloneDeep from 'lodash/cloneDeep'
import { Subject } from './subject'
import { Exam } from '../exam-list/type/exam'
import { CrudService } from '../../../../service/crud/crud.service'

@Component({
    selector: 'exam-program',
    templateUrl: './exam-program.html'
})
export class ExamProgramComponent implements OnInit {
    examListText = examProgramsText
    displayedColumns = ['name', 'subject', 'programUrl', 'delete']
    programs: MatTableDataSource<ExamProgram>
    newProgram = new ExamProgram('', '', Subject.ART, '')
    years = [2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013]

    subjectNames = Object.keys(Subject)
    subjectTypeEnum = Subject

    private path = '/programs'

    @ViewChild(MatSort, {static: true}) sort: MatSort

    constructor(private service: CrudService) {
    }

    ngOnInit(): void {
        this.service.retrieveAll<ExamProgram>(this.path).subscribe(programs => {
            this.programs = new MatTableDataSource(programs)
            this.programs.sort = this.sort
        })
    }

    addRow() {
        this.programs.data.push(cloneDeep(this.newProgram))
        this.programs.data = this.programs.data.slice()

        this.newProgram.programUrl = ''
    }

    updateProgram(program: ExamProgram) {
        this.service.update(this.path, program)
    }

    saveNewProgram() {
        this.service.create(this.path, this.newProgram)
    }

    delete(program: ExamProgram) {
        this.service.delete(this.path, program.id)
        this.programs.data = this.programs.data.filter(i => i !== program)
    }

}

