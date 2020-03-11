import { TestBed } from '@angular/core/testing'
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar'

import createSpyObj = jasmine.createSpyObj
import { SnackbarService } from './snackbar.service'
import SpyObj = jasmine.SpyObj

describe(`${SnackbarService.name}`, () => {

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                SnackbarService,
                {provide: MatSnackBar, useValue: createSpyObj('MatSnackBar', ['open'])}
            ]
        })
    })

    it('shows success snack', () => {
        const message = 'message'
        const config = new MatSnackBarConfig()
        config.duration = 2000
        config.panelClass = ['success-snackbar']

        TestBed.inject(SnackbarService).showSuccess(message)

        expect((TestBed.inject(MatSnackBar) as SpyObj<MatSnackBar>).open).toHaveBeenCalledWith(message, '', config)
    })

})
