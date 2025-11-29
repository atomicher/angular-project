import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common'; // Для *ngIf
import { AuthService } from '../../app/core/services/auth.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.html',
  styleUrls: ['./layout.css'],
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule]
})
export class LayoutComponent {
  appTitle = 'Подорожі';
  authService = inject(AuthService); // Інжектуємо сервіс для доступу до isAuthenticated

  logout() {
    this.authService.logout();
  }
}