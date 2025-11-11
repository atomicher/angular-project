import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ItemCardComponent } from '../item-card/item-card';
import { TravelDestination } from '../shared/models/travel-destination.model';

@Component({
  selector: 'app-items-list',
  standalone: true,
  imports: [CommonModule, FormsModule, ItemCardComponent],
  templateUrl: './items-list.html',
  styleUrls: ['./items-list.css']
})
export class ItemsListComponent {
  searchText: string = '';

  destinations: TravelDestination[] = [
  {
    id: 1,
    name: 'Париж',
    country: 'Франція',
    description: 'Місто кохання.',
    imageUrl: 'assets/paris.jpg'
  },
  {
    id: 2,
    name: 'Київ',
    country: 'Україна',
    description: 'Столиця України.',
    imageUrl: 'assets/kyiv.jpg'
  },
  {
    id: 3,
    name: 'Токіо',
    country: 'Японія',
    description: 'Місто майбутнього.',
    imageUrl: 'assets/tokyo.jpg'
  }
];


  get filteredDestinations(): TravelDestination[] {
    return this.destinations.filter(d =>
      d.name.toLowerCase().includes(this.searchText.toLowerCase()) ||
      d.country.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  onDestinationSelected(selected: TravelDestination): void {
    console.log('Обрано:', selected);
  }
}
