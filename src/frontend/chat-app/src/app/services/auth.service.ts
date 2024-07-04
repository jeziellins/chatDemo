import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'https://localhost:7208/api/login'; 

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    const body = { email, password };

    return this.http.post<any>(this.apiUrl, body).pipe(
      tap(response => {
        if (response && response.jwtToken) {
          localStorage.setItem('jwtToken', response.jwtToken);
        }
      }),
      catchError(this.handleError)
    );
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('jwtToken');
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Ocorreu um erro desconhecido!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Erro: ${error.error.message}`;
    } else {
      if(error.status == 401)
        errorMessage = `Usuário ou senha inválido!`;
    }
    return new Observable<never>((observer) => {
      observer.error(errorMessage);
    });
  }
}
