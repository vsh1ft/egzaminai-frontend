import { Component, OnInit, ViewChild } from '@angular/core'
import { examListText } from './exam-list.constant'
import { MatTableDataSource } from '@angular/material/table'
import { MatSort } from '@angular/material/sort'
import { Exam } from './exam'
import { ExamListService } from './service/exam-list.service'

@Component({
    selector: 'exam-list',
    templateUrl: './exam-list.html'
})
export class ExamListComponent implements OnInit {
    examListText = examListText
    displayedColumns = ['name', 'year', 'type', 'examUrl', 'answerUrl', 'delete']
    exams: MatTableDataSource<Exam>
    emptyExam = new Exam('', 0, '', '', '')
    years = [2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013]
    examNames = ['Lietuvių kalba ir literatūra', 'Informacinės technologijos', 'Biologija', 'Matematika', 'Chemija', 'Fizika',
        'Istorija', 'Užsienio kalba (anglų)', 'Užsienio kalba (prancūzų)', 'Užsienio kalba (rusų)', 'Užsienio kalba (vokiečių)',
        'Geografija', 'Gimtoji kalba (baltarusų)', 'Gimtoji kalba (lenkų)', 'Gimtoji kalba (rusų)', 'Muzikologija (kūrybinė užduotis)',
        'Biologija', 'Muzikologija (diktanto natos)', 'Muzikos istorijos ir teorijos testas', 'Muzikinio mąstymo testas']
    types = ['VBE', 'MBE']

    @ViewChild(MatSort, {static: true}) sort: MatSort

    constructor(private examListService: ExamListService) {
    }

    ngOnInit(): void {
        this.examListService.getExams().subscribe(exams => {
            this.exams = new MatTableDataSource(exams)
            this.exams.sort = this.sort
        })
    }

}

