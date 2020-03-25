import { Component, OnInit, ViewChild } from '@angular/core'
import { courseCreditText } from './course-credit.constant'
import { MatTableDataSource } from '@angular/material/table'
import cloneDeep from 'lodash/cloneDeep'
import { MatSort } from '@angular/material/sort'
import { CourseCredit } from './course-credit'
import { CrudService } from '../../../../service/crud/crud.service'

@Component({
    selector: 'course-credit',
    templateUrl: './course-credit.html'
})
export class CourseCreditComponent implements OnInit {
    creditText = courseCreditText
    displayedColumns = ['name', 'year', 'creditUrl', 'delete']
    credits: MatTableDataSource<CourseCredit>
    newCredit = new CourseCredit('', '', 0, '')
    years = [2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013]

    private path = '/credits'

    @ViewChild(MatSort, {static: true}) sort: MatSort

    constructor(private service: CrudService) {
    }

    ngOnInit(): void {
        this.service.retrieveAll<CourseCredit>(this.path).subscribe(programs => {
            this.credits = new MatTableDataSource(programs)
            this.credits.sort = this.sort
        })
    }

    addRow() {
        this.credits.data.push(cloneDeep(this.newCredit))
        this.credits.data = this.credits.data.slice()
    }

    updateCredit(credit: CourseCredit) {
        this.service.update(this.path, credit)
    }

    saveNewCredit() {
        this.service.create(this.path, this.newCredit)
    }

    delete(credit: CourseCredit) {
        this.service.delete(this.path, credit.id)
        this.credits.data = this.credits.data.filter(i => i !== credit)
    }

}

