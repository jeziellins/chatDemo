import { Component, Input, SimpleChanges } from '@angular/core';
import { MessageService, Message } from '../services/message.service';
import { HubService } from '../services/hub.service'

@Component({
  selector: 'app-chat-history',
  templateUrl: './chat-history.component.html',
  styleUrls: ['./chat-history.component.css']
})
export class ChatHistoryComponent {
  @Input() targetUserId: string = '';
  @Input() scrollPosition: string = '';
  errorMessage: string = '';
  messages: Message[] = [];

  constructor(private messageService: MessageService, private hubService: HubService) {
    const connection = this.hubService.getConnection();
    connection.on("MessageNotify", (message: Message) => {
      let userId = localStorage.getItem('userId');
      if ((message.sourceUserId == userId && message.targetUserId == this.targetUserId) || 
          (message.sourceUserId == this.targetUserId && message.targetUserId == userId)) {
        this.messages.push(message);  
        this.scrollCheck();
      }            
    });
  }

  isSourceMessage(sourceUserId: string) {
    return sourceUserId !== this.targetUserId;
  }

  scrollCheck() {
    setTimeout(() => {
      if (this.scrollPosition == "bottom") {
        let container = document.getElementById('scrollContainer');
        if (container) {
          container.scrollTop = container.scrollHeight;
        }
      }
    }, 200);
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

      this.scrollCheck();
    }    
  }


}
