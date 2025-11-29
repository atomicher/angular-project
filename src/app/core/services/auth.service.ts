import { Injectable, signal, inject } from '@angular/core';
import { Router } from '@angular/router';
import { of, Observable, throwError } from 'rxjs';
import { delay, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private router = inject(Router);
  
  // Ключ для localStorage
  private readonly TOKEN_KEY = 'auth_token';

  // Сигнал для відстеження стану (чи залогінений користувач)
  isAuthenticated = signal<boolean>(this.hasToken());

  constructor() {}

  private hasToken(): boolean {
    return !!localStorage.getItem(this.TOKEN_KEY);
  }

  // Симуляція запиту на сервер
  login(loginData: any): Observable<boolean> {
    // Імітуємо перевірку пароля (в реальності це робить бекенд)
    if (loginData.email === 'admin@gmail.com' && loginData.password === '12345') {
      
      // Генеруємо фейковий токен
      const fakeToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.fake-token-signature';
      
      return of(true).pipe(
        delay(1000), // Імітація затримки мережі
        tap(() => {
          localStorage.setItem(this.TOKEN_KEY, fakeToken);
          this.isAuthenticated.set(true);
        })
      );
    } else {
      return throwError(() => new Error('Невірний логін або пароль'));
    }
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    this.isAuthenticated.set(false);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }
}