import { Injectable, signal } from '@angular/core';

export interface ToastMessage {
  text: string;
  type: 'success' | 'error' | 'info';
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  // Використовуємо signal для реактивності
  message = signal<ToastMessage | null>(null);

  show(text: string, type: 'success' | 'error' | 'info' = 'info') {
    this.message.set({ text, type });

    // Автоматично ховаємо через 4 секунди
    setTimeout(() => {
      this.clear();
    }, 4000);
  }

  clear() {
    this.message.set(null);
  }
}