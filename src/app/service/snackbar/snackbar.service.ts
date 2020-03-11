import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar'
import { Injectable } from '@angular/core'

@Injectable()
export class SnackbarService {
    constructor(private snackBar: MatSnackBar) {
    }

    showSuccess(message: string) {
        const config = new MatSnackBarConfig()
        config.duration = 2000
        config.panelClass = ['success-snackbar']
        this.snackBar.open(message, '', config)
    }
}
