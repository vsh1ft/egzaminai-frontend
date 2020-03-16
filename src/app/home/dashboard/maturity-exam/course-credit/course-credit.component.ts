import { Component, OnInit, ViewChild } from '@angular/core'
import { courseCreditText } from './course-credit.constant'
import { MatTableDataSource } from '@angular/material/table'
import { MatSort } from '@angular/material/sort'
import { CourseCredit } from './course-credit'
import { CourseCreditService } from './service/course-credit.service'

@Component({
    selector: 'exam-program',
    templateUrl: './course-credit.html'
})
export class CourseCreditComponent implements OnInit {
    creditText = courseCreditText
    displayedColumns = ['name', 'year', 'creditUrl', 'delete']
    credits: MatTableDataSource<CourseCredit>
    emptyExam = new CourseCredit('', 0, '')
    years = [2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013]

    types = ['VBE', 'MBE']

    @ViewChild(MatSort, {static: true}) sort: MatSort

    constructor(private examProgramService: CourseCreditService) {
    }

    ngOnInit(): void {
        this.examProgramService.getCredits().subscribe(programs => {
            this.credits = new MatTableDataSource(programs)
            this.credits.sort = this.sort
        })
    }

}

