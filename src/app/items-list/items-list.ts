import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
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
export class ItemsListComponent implements OnInit, OnDestroy {

  destinations: TravelDestination[] = [];
  searchTerm: string = '';
  private subscription!: Subscription;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    // реактивна підписка
    this.subscription = this.dataService.items$.subscribe(items => {
      this.destinations = items;
    });

    // початкове завантаження
    this.dataService.getItems().subscribe();
  }

  onSearchChange() {
    this.dataService.filterItems(this.searchTerm);
  }

  ngOnDestroy(): void {
    // відписка
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onDestinationSelected(dest: TravelDestination) {
    console.log('Обраний елемент:', dest);
  }
}
