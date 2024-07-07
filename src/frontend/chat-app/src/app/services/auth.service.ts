import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { jwtDecode } from 'jwt-decode';
import { environment } from '../../environments/environment'

interface JwtPayload {
  exp: number;
  sub: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = `${environment.apiUrl}/api/login`;

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    const body = { email, password };

    return this.http.post<any>(this.apiUrl, body).pipe(
      tap(response => {
        if (response && response.jwtToken) {
          const decoded: JwtPayload = jwtDecode(response.jwtToken);
          localStorage.setItem('userId', decoded.sub);
          localStorage.setItem('jwtToken', response.jwtToken);
        }
      }),
      catchError(this.handleError)
    );
  }

  isTokenExpired(token: string): boolean {
    if (!token) return true;

    const decoded: JwtPayload = jwtDecode(token);
    const expirationDate = new Date(0);
    expirationDate.setUTCSeconds(decoded.exp);
    return expirationDate < new Date();
  }

  isLoggedIn(): boolean {    
    const token = localStorage.getItem('jwtToken');;
    return token ? !this.isTokenExpired(token) : false;
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Ocorreu um erro desconhecido!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Erro: ${error.error.message}`;
    } else {
      if (error.status == 401)
        errorMessage = `Usuário ou senha inválido!`;
    }
    return new Observable<never>((observer) => {
      observer.error(errorMessage);
    });
  }
}
