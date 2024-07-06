import { Injectable } from '@angular/core';
import { HttpTransportType, HubConnection, HubConnectionBuilder, LogLevel } from "@microsoft/signalr";

@Injectable({
  providedIn: 'root'
})
export class HubService {
  hubConnection: HubConnection;
  constructor() {
    const baseURL = "https://localhost:7208";
    const token = localStorage.getItem('jwtToken');
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(`${baseURL}/hubs/chat`, {
        accessTokenFactory: () => token as string,
        skipNegotiation: true,
        transport: HttpTransportType.WebSockets
      })
      .configureLogging(LogLevel.Information)
      .withAutomaticReconnect()
      .build();
    this.hubConnection.start();
   }

   getConnection(): HubConnection {
    return this.hubConnection;
  }
}
