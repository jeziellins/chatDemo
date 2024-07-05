import { Component, EventEmitter, Output } from '@angular/core';
import { UserService, User } from '../services/user.service';

@Component({
  selector: 'app-conversations',
  templateUrl: './conversations.component.html',
  styleUrls: ['./conversations.component.css']
})
export class ConversationsComponent {
  @Output() setTargetUserId = new EventEmitter<string>();
  users: User[] = [];
  errorMessage: string = '';
  
  constructor(private userService: UserService) { }

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
    console.log(id);
    this.setTargetUserId.emit(id);
  }
}
