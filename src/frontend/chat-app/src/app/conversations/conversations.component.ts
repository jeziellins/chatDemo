import { Component, EventEmitter, Output } from '@angular/core';
import { UserService, User } from '../services/user.service';
import { Message } from '../services/message.service';
import { HubService } from '../services/hub.service'

@Component({
  selector: 'app-conversations',
  templateUrl: './conversations.component.html',
  styleUrls: ['./conversations.component.css']
})
export class ConversationsComponent {
  @Output() setTargetUserId = new EventEmitter<string>();
  users: User[] = [];
  errorMessage: string = '';


  constructor(private userService: UserService, private hubService: HubService) {
    const connection = this.hubService.getConnection();
    connection.on("MessageNotify", (message: Message) => {
      let userId = localStorage.getItem('userId');
      console.log(message);
      if (message.targetUserId != userId)
        return;

      for (let i = 0; i < this.users.length; i++) {
        if (!this.users[i].countNewMessage) {
          this.users[i].countNewMessage = 0;
        }

        if (this.users[i].id == message.sourceUserId && !this.users[i].selected) {
          this.users[i].isNewMessage = true;
          this.users[i].countNewMessage++;
        }
      }
    });
  }

  ngOnInit(): void {
    this.userService.getUsers().subscribe({
      next: (data) => {
        this.users = data;
      },
      error: (error) => {
        this.errorMessage = error.message;
      }
    });
  }

  onSetTargetUserId(id: string) {
    this.setTargetUserId.emit(id);
    for (let i = 0; i < this.users.length; i++) {
      this.users[i].selected = this.users[i].id === id;
      if (this.users[i].id === id) {
        this.users[i].isNewMessage = false;
        this.users[i].countNewMessage = 0;
      }
    }
  }
}
