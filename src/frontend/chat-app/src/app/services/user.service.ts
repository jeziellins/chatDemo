import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private endpontUsers = `${environment.apiUrl}/api/users`; 
  private endpontUser = `${environment.apiUrl}/api/user`; 

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.endpontUsers).pipe(
      catchError(this.handleError)
    );
  }

  getUser(): Observable<User> {
    return this.http.get<User>(this.endpontUser).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Ocorreu um erro desconhecido!';
    if (error.error instanceof ErrorEvent) {
      console.error(`Erro: ${error.error.message}`);
    } else {
      console.error(`Código do erro: ${error.status}\nMensagem: ${error.message}`);
    }
    return throwError(() => new Error(errorMessage));
  }
}

export interface User {
  id: string;
  name: string;
  email: string;
  selected: boolean;
}
