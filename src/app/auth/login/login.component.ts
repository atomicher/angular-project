import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { ToastService } from '../../core/services/toast.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="login-container">
      <h2>Вхід у систему</h2>
      <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
        
        <div class="form-group">
          <label>Email</label>
          <input type="email" formControlName="email" placeholder="admin@gmail.com">
        </div>

        <div class="form-group">
          <label>Пароль</label>
          <input type="password" formControlName="password" placeholder="12345">
        </div>

        <button type="submit" [disabled]="loginForm.invalid || isLoading">
          {{ isLoading ? 'Входимо...' : 'Увійти' }}
        </button>
      </form>
      
      <div class="hint">
        <small>Тестові дані: admin@gmail.com / 12345</small>
      </div>
    </div>
  `,
  styles: [`
    .login-container { max-width: 400px; margin: 2rem auto; padding: 2rem; background: white; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
    .form-group { margin-bottom: 1rem; }
    label { display: block; margin-bottom: 0.5rem; font-weight: bold; }
    input { width: 100%; padding: 0.8rem; border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box; }
    button { width: 100%; padding: 10px; background: #1976d2; color: white; border: none; border-radius: 4px; cursor: pointer; margin-top: 1rem; }
    button:disabled { background: #ccc; }
    .hint { margin-top: 1.5rem; text-align: center; color: #666; background: #f5f5f5; padding: 0.5rem; border-radius: 4px; }
  `]
})
export class LoginComponent {
  authService = inject(AuthService);
  router = inject(Router);
  toastService = inject(ToastService); // Використовуємо наш сервіс повідомлень

  isLoading = false;

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      
      this.authService.login(this.loginForm.value).subscribe({
        next: () => {
          this.isLoading = false;
          this.toastService.show('Успішний вхід!', 'success');
          this.router.navigate(['/items']);
        },
        error: (err) => {
          this.isLoading = false;
          this.toastService.show(err.message, 'error');
        }
      });
    }
  }
}