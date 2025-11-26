import { HttpInterceptorFn } from '@angular/common/http';

export const baseUrlInterceptor: HttpInterceptorFn = (req, next) => {
  // Базовий URL  API
  const apiBaseUrl = 'http://localhost:3000';

  // Клонуємо запит і змінюємо URL, додаючи базову адресу
  // Якщо робимо запит 'destinations', він стане 'http://localhost:3000/destinations'
  const apiReq = req.clone({
    url: `${apiBaseUrl}/${req.url}`
  });

  return next(apiReq);
};