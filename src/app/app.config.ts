import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http'; // 1. Імпорти

import { routes } from './app.routes';
import { baseUrlInterceptor } from './core/interceptors/base-url.interceptor'; // 2. Імпорт інтерцептора

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    // 3. Підключення HTTP Client з інтерцептором
    provideHttpClient(withInterceptors([baseUrlInterceptor]))
  ]
};