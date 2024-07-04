import { Component } from '@angular/core';
import { MessageService, Message } from '../services/message.service';

@Component({
  selector: 'app-chat-history',
  templateUrl: './chat-history.component.html',
  styleUrls: ['./chat-history.component.css']
})
export class ChatHistoryComponent {
  targetUserId: string = '51fefa21-ba1d-42ca-bcf2-a61d0f221111';
  errorMessage: string = '';
  messages: Message[] = [];


  constructor(private messageService: MessageService) { }

  isSourceMessage(sourceUserId: string) {
    return sourceUserId !== this.targetUserId;
  }
  ngOnInit(): void {
    const agora = new Date();
    const ano = agora.getFullYear();
    const mes = String(agora.getMonth() + 1).padStart(2, '0');
    const dia = String(agora.getDate()).padStart(2, '0');
    const hora = String(agora.getHours()).padStart(2, '0');
    const minutos = String(agora.getMinutes()).padStart(2, '0');
    const segundos = String(agora.getSeconds()).padStart(2, '0');
    const dataFormatada = `${ano}-${mes}-${dia} ${hora}%3A${minutos}%3A${segundos}`;

    this.messageService.getMessages(this.targetUserId, dataFormatada).subscribe({
      next: (response) => {
        this.messages = response;
        this.errorMessage = '';
      },
      error: (error) => {
        this.errorMessage = error.message;
        this.messages = [];
      }
    });
  }
}
