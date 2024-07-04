import { Component } from '@angular/core';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-chat-input',
  templateUrl: './chat-input.component.html',
  styleUrls: ['./chat-input.component.css']
})
export class ChatInputComponent {
  targetUserId: string = '8ff1b47c-4b6f-4ec2-8d3d-89d7b4ee755e';
  text: string = '';
  errorMessage: string = '';

  constructor(private messageService: MessageService) { }  

  sendMessage(): void {
    this.messageService.sendMessage(this.targetUserId, this.text).subscribe({
      next: (response) => {
        this.errorMessage = '';
        this.text = '';
      },
      error: (error) => {
        this.errorMessage = error.message;
      }
    });
  }
}
