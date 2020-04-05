import { Component, OnInit, ViewChild } from '@angular/core'
import { puppDatesText } from './pupp-date.constant'
import { MatTableDataSource } from '@angular/material/table'
import { MatSort } from '@angular/material/sort'
import { PuppDate } from './pupp-date'
import cloneDeep from 'lodash/cloneDeep'
import { PuppExamName } from '../pupp-exam-name'
import { CrudService } from '../../../../service/crud/crud.service'

@Component({
    selector: 'pupp-date',
    templateUrl: './pupp-date.html'
})
export class PuppDateComponent implements OnInit {
    puppDatesText = puppDatesText
    displayedColumns = ['name', 'dateTime', 'color', 'delete']
    dates: MatTableDataSource<PuppDate>
    newDate = new PuppDate('', PuppExamName.FOREIGN_LANGUAGE_VERBAL, '', '')

    examNames = Object.keys(PuppExamName)
    examNamesEnum = PuppExamName

    @ViewChild(MatSort, {static: true}) sort: MatSort

    private path = '/pupp-dates'

    constructor(private service: CrudService) {
    }

    ngOnInit(): void {
        this.service.retrieveAll<PuppDate>(this.path).subscribe(programs => {
            this.dates = new MatTableDataSource(programs)
            this.dates.sort = this.sort
        })
    }

    addRow() {
        this.dates.data.push(cloneDeep(this.newDate))
        this.dates.data = this.dates.data.slice()
    }

    updateDate(date: PuppDate) {
        this.service.update(this.path, date)
    }

    saveNewDate() {
        this.service.create(this.path, this.newDate)
    }

    delete(date: PuppDate) {
        this.service.delete(this.path, date.id)
        this.dates.data = this.dates.data.filter(i => i !== date)
    }

}

