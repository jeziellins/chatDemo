import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit(): void {
    this.authService.login(this.email, this.password).subscribe({
      next: (response) => {
        this.router.navigate(['/home']); 
      },
      error: (error) => {
        this.errorMessage = error;
        console.error('Erro de login', error);
      }
    });
  }
}
