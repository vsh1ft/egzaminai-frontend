import { Component, OnInit, ViewChild } from '@angular/core'
import { puppDatesText } from './pupp-date.constant'
import { MatTableDataSource } from '@angular/material/table'
import { MatSort } from '@angular/material/sort'
import { PuppDate } from './pupp-date'
import { PuppDateService } from './service/pupp-date.service'

@Component({
    selector: 'pupp-date',
    templateUrl: './pupp-date.html'
})
export class PuppDateComponent implements OnInit {
    puppDatesText = puppDatesText
    displayedColumns = ['name', 'dateTime', 'delete']
    dates: MatTableDataSource<PuppDate>
    emptyExam = new PuppDate('', '')

    @ViewChild(MatSort, {static: true}) sort: MatSort

    constructor(private examProgramService: PuppDateService) {
    }

    ngOnInit(): void {
        this.examProgramService.getDates().subscribe(programs => {
            this.dates = new MatTableDataSource(programs)
            this.dates.sort = this.sort
        })
    }

}

