import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [ FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  showLoginModal: boolean = false;

  constructor(private readonly authService: AuthService) {}

  login() {
    this.authService.login(this.username, this.password);
    if (this.authService.getIsAuthenticated()) {
      this.showLoginModal = false;
    }
  }

  logout() {
    this.authService.logout();
  }

  get isAuthenticated(): boolean {
    return this.authService.getIsAuthenticated();
  }

  get usernameDisplay(): string | null {
    return this.authService.getUsername();
  }
}
