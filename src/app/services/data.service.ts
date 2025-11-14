import { Injectable } from '@angular/core';
import { TravelDestination } from '../shared/models/travel-destination.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private destinations: TravelDestination[] = [
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

  getItems(): TravelDestination[] {
    return this.destinations;
  }
}
