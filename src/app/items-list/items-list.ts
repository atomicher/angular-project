import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemCardComponent } from '../item-card/item-card';
import { TravelDestination } from '../shared/models/travel-destination.model';

@Component({
  selector: 'app-items-list',
  standalone: true,
  imports: [CommonModule, ItemCardComponent],
  templateUrl: './items-list.html',
  styleUrls: ['./items-list.css']
})
export class ItemsListComponent {
  destinations: TravelDestination[] = [
    {
      id: 1,
      name: 'Париж',
      country: 'Франція',
      description: 'Місто кохання з Ейфелевою вежею.',
      imageUrl: 'assets/paris.jpg'
    },
    {
      id: 2,
      name: 'Київ',
      country: 'Україна',
      description: 'Столиця з багатою історією та культурою.',
      imageUrl: 'assets/kyiv.jpg'
    },
    {
      id: 3,
      name: 'Токіо',
      country: 'Японія',
      description: 'Сучасне місто з традиційною душею.',
      imageUrl: 'assets/tokyo.jpg'
    }
  ];
}
