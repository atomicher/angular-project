import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout';
import { ItemsListComponent } from './items-list/items-list';
import { ItemDetailsComponent } from './item-details/item-details';
import { ItemFormComponent } from './item-form/item-form'; // 1. Імпорт

export const routes: Routes = [
  { path: '', redirectTo: 'items', pathMatch: 'full' },
  
  { 
    path: '', 
    component: LayoutComponent,
    children: [
      { path: 'items', component: ItemsListComponent },
      { path: 'items/add', component: ItemFormComponent }, // 2. Новий маршрут (до :id !!!)
      { path: 'items/:id', component: ItemDetailsComponent } 
    ]
  },
  
  { path: '**', redirectTo: 'items' }
];