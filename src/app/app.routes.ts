import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout';
import { ItemsListComponent } from './items-list/items-list';
import { ItemDetailsComponent } from './item-details/item-details';
import { ItemFormComponent } from './item-form/item-form';
import { LoginComponent } from './auth/login/login.component'; // 1. Імпорт
import { authGuard } from './core/guards/auth.guard';           // 2. Імпорт

export const routes: Routes = [
  { path: 'login', component: LoginComponent }, // 3. Маршрут логіну

  { 
    path: '', 
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'items', pathMatch: 'full' },
      { path: 'items', component: ItemsListComponent },
      
      // 4. ЗАХИЩАЄМО ЦЕЙ МАРШРУТ
      { 
        path: 'items/add', 
        component: ItemFormComponent,
        canActivate: [authGuard] // <-- Тільки для авторизованих
      },
      
      { path: 'items/:id', component: ItemDetailsComponent } 
    ]
  },
  { path: '**', redirectTo: 'items' }
];