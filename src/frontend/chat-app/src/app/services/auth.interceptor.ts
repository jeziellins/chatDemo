import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> {
    const jwtToken = localStorage.getItem('jwtToken');

    if (jwtToken) {
      const cloned = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${jwtToken}`)
      });
      return next.handle(cloned).pipe(
        catchError((error: HttpErrorResponse) => {          
          if (error.status == 401) {
            this.router.navigate(['/login']);
          }
          return throwError(() => new Error(error.message));
        })
      );
    } else {
      return next.handle(request);
    }
  }
}
