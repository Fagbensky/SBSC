import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(

    private snackBar: MatSnackBar,
  ) { }

  snackBarDurationInSeconds = 3.5;

  errorMessage = {
    code: 0,
    message: ''
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        retry(1),
        catchError((error: HttpErrorResponse) => {
          if (error.error instanceof ErrorEvent) {
            // client-side error
            this.errorMessage.message = error.error.message;
          } else {
            // server-side error
            this.errorMessage.code = error.status;
            this.errorMessage.message = error.message
          }
          this.showSnackbarAction(this.errorMessage.message, 'Close');
          return throwError(() => this.errorMessage);
        })
      );
  }

  showSnackbarAction(content: string, action: string) {
    let snack = this.snackBar.open(content, action, {
      duration: this.snackBarDurationInSeconds * 1000,
    });
  }
}
