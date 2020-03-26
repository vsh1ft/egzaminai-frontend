import { Component, OnInit, ViewChild } from '@angular/core'
import { puppProgramsText } from './pupp-program.constant'
import { MatTableDataSource } from '@angular/material/table'
import { MatSort } from '@angular/material/sort'
import { PuppProgram } from './pupp-program'
import cloneDeep from 'lodash/cloneDeep'
import { CrudService } from '../../../../service/crud/crud.service'

@Component({
    selector: 'pupp-program',
    templateUrl: './pupp-program.html'
})
export class PuppProgramComponent implements OnInit {
    programsText = puppProgramsText
    displayedColumns = ['name', 'programUrl', 'delete']
    programs: MatTableDataSource<PuppProgram>
    newProgram = new PuppProgram('', '', '')

    @ViewChild(MatSort, {static: true}) sort: MatSort

    private path = '/pupp-programs'

    constructor(private service: CrudService) {
    }

    ngOnInit(): void {
        this.service.retrieveAll<PuppProgram>(this.path).subscribe(programs => {
            this.programs = new MatTableDataSource(programs)
            this.programs.sort = this.sort
        })
    }

    addRow() {
        this.programs.data.push(cloneDeep(this.newProgram))
        this.programs.data = this.programs.data.slice()

        this.newProgram.programUrl = ''
    }

    updateProgram(program: PuppProgram) {
        this.service.update(this.path, program)
    }

    saveNewProgram() {
        this.service.create(this.path, this.newProgram)
    }

    delete(program: PuppProgram) {
        this.service.delete(this.path, program.id)
        this.programs.data = this.programs.data.filter(i => i !== program)
    }

}

