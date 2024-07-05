import { Component, Input, SimpleChanges } from '@angular/core';
import { MessageService, Message } from '../services/message.service';

@Component({
  selector: 'app-chat-history',
  templateUrl: './chat-history.component.html',
  styleUrls: ['./chat-history.component.css']
})
export class ChatHistoryComponent {
  @Input() targetUserId: string = '';
  errorMessage: string = '';
  messages: Message[] = [];

  constructor(private messageService: MessageService) { }

  isSourceMessage(sourceUserId: string) {
    return sourceUserId !== this.targetUserId;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['targetUserId'] && this.targetUserId) {
      this.messages = [];
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
}
