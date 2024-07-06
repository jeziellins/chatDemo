import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'https://localhost:7208/api/users'; // Substitua pela URL do seu endpoint

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl).pipe(
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
  selected: boolean;
}
