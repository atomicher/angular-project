import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { ToastService } from '../../services/toast.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const toastService = inject(ToastService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMessage = 'Невідома помилка';

      if (error.error instanceof ErrorEvent) {
        // Помилка на стороні клієнта (мережа тощо)
        errorMessage = `Помилка клієнта: ${error.error.message}`;
      } else {
        // Помилка на стороні сервера (4xx, 5xx)
        switch (error.status) {
          case 400:
            errorMessage = 'Невірний запит (400). Перевірте дані.';
            break;
          case 401:
            errorMessage = 'Неавторизовано (401). Увійдіть у систему.';
            break;
          case 403:
            errorMessage = 'Доступ заборонено (403).';
            break;
          case 404:
            errorMessage = 'Ресурс не знайдено (404).';
            break;
          case 500:
            errorMessage = 'Помилка сервера (500). Спробуйте пізніше.';
            break;
          default:
            errorMessage = `Помилка: ${error.status} - ${error.message}`;
        }
      }

      // Показуємо повідомлення
      toastService.show(errorMessage, 'error');

      // Прокидаємо помилку далі, щоб компонент теж знав, що сталася біда
      return throwError(() => error);
    })
  );
};