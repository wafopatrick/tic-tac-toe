import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated = false;
  private username: string | null = null;

  private readonly validUsers = [
    { username: 'user1', password: 'password1' },
    { username: 'user2', password: 'password2' },
  ];

  login(username: string, password: string) {
    const user = this.validUsers.find(
      (u) => u.username === username && u.password === password
    );
    if (user) {
      this.isAuthenticated = true;
      this.username = username;
    } else {
      alert('Invalid username or password');
    }
  }

  logout() {
    this.isAuthenticated = false;
    this.username = null;
  }

  getUsername(): string | null {
    return this.username;
  }

  getIsAuthenticated(): boolean {
    return this.isAuthenticated;
  }
}
