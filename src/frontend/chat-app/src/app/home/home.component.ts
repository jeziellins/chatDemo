import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {  
  targetUserIdShared: string = '';
  
  constructor(private router: Router) {}

  onSetTargetUserId(id: string) {
    this.targetUserIdShared = id;
  }

  exit(){
    localStorage.removeItem('jwtToken');
    this.router.navigate(['/login']);
  }
}
