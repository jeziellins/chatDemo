import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  targetUserIdShared: string = '';
  private isScrolling: any;

  constructor(private router: Router) { }

  onSetTargetUserId(id: string) {
    this.targetUserIdShared = id;
  }
  
  exit() {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('userId');
    this.router.navigate(['/login']);
  }
}
