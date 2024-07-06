import { Component, Input } from '@angular/core';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-chat-input',
  templateUrl: './chat-input.component.html',
  styleUrls: ['./chat-input.component.css']
})
export class ChatInputComponent {
  @Input() targetUserId: string = '';
  text: string = '';
  errorMessage: string = '';

  constructor(private messageService: MessageService) { }

  sendMessage(): void {
    this.messageService.sendMessage(this.targetUserId, this.text).subscribe({
      next: (response) => {
        this.errorMessage = '';
        this.text = '';

        let container = document.getElementById('scrollContainer');
        if (container) {
          container.scrollTop = container.scrollHeight;
        }
      },
      error: (error) => {
        this.errorMessage = error.message;
      }
    });
  }
}
