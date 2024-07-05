import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {  
  targetUserIdShared: string = '';
  
  onSetTargetUserId(id: string) {
    this.targetUserIdShared = id;
  }
}
