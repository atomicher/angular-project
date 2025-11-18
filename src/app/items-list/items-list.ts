import { Component, OnInit } from '@angular/core'; // OnDestroy більше не потрібен
import { CommonModule } from '@angular/common'; // Містить AsyncPipe
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs'; // Імпортуємо Observable
import { ItemCardComponent } from '../item-card/item-card';
import { TravelDestination } from '../shared/models/travel-destination.model';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-items-list',
  standalone: true,
  templateUrl: './items-list.html',
  styleUrls: ['./items-list.css'],
  imports: [CommonModule, FormsModule, ItemCardComponent]
})
export class ItemsListComponent implements OnInit {

  // Замість масиву даних, ми використовуємо Observable напряму
  items$: Observable<TravelDestination[]>; 
  searchTerm: string = '';

  constructor(private dataService: DataService) {
    // Присвоюємо потік з сервісу змінній компонента
    this.items$ = this.dataService.items$;
  }

  ngOnInit(): void {
    // Лише ініціюємо завантаження, але НЕ підписуємось тут (.subscribe)
    this.dataService.getItems().subscribe(); 
  }

  onSearchChange() {
    this.dataService.filterItems(this.searchTerm);
  }
  
  // ngOnDestroy видалено, бо AsyncPipe відпишеться сам!
}