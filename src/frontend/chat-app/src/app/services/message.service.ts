import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private endPointSend = `${environment.apiUrl}/api/send`;  
  private endPointGetMessages = `${environment.apiUrl}/api/messages`; 

  constructor(private http: HttpClient) { }

  sendMessage(targetUserId: string, text: string): Observable<any> {
    const body = { targetUserId, text };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<any>(this.endPointSend, body, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    if (error.error instanceof ErrorEvent) {
      console.error(`Erro: ${error.error.message}`);
    } else {
      console.error(`Código do erro: ${error.status}\nMensagem: ${error.message}`);
    }
    let errorMessage = 'Ocorreu um erro desconhecido!';    
    return throwError(() => new Error(errorMessage));
  }

  getMessages(guid: string, date: string): Observable<Message[]> {
    const url = `${this.endPointGetMessages}/${guid}/${date}`;
    return this.http.get<Message[]>(url).pipe(
      catchError(this.handleError)
    );
  }
}


export interface Message {
  id: string;
  receiveAt: string;
  sourceUserId: string;
  targetUserId: string;
  text: string;
}