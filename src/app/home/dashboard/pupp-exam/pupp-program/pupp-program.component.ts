import { Component, OnInit, ViewChild } from '@angular/core'
import { puppProgramsText } from './pupp-program.constant'
import { MatTableDataSource } from '@angular/material/table'
import { MatSort } from '@angular/material/sort'
import { PuppProgram } from './pupp-program'
import { PuppProgramService } from './service/pupp-program.service'

@Component({
    selector: 'pupp-program',
    templateUrl: './pupp-program.html'
})
export class PuppProgramComponent implements OnInit {
    programsText = puppProgramsText
    displayedColumns = ['name', 'programUrl', 'delete']
    programs: MatTableDataSource<PuppProgram>
    emptyExam = new PuppProgram('', '')

    @ViewChild(MatSort, {static: true}) sort: MatSort

    constructor(private examProgramService: PuppProgramService) {
    }

    ngOnInit(): void {
        this.examProgramService.getPrograms().subscribe(programs => {
            this.programs = new MatTableDataSource(programs)
            this.programs.sort = this.sort
        })
    }

}

