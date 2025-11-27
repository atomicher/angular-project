import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
// 1. Імпорт компонента Toast
import { ToastComponent } from './shared/components/toast/toast.component';

@Component({
  selector: 'app-root',
  // 2. Додаємо ToastComponent в imports
  imports: [RouterOutlet, ToastComponent],
  // 3. Додаємо тег в шаблон
  template: `
    <app-toast></app-toast>
    <router-outlet></router-outlet>
  `,
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('angular-project');
}