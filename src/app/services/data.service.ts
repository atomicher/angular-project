import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
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

  // BehaviorSubject
  private itemsSubject = new BehaviorSubject<TravelDestination[]>(this.destinations);

  // Публічний Observable
  items$: Observable<TravelDestination[]> = this.itemsSubject.asObservable();

  // getItems повертає Observable
  getItems(): Observable<TravelDestination[]> {
    return of(this.destinations);
  }

  // Реактивна фільтрація
  filterItems(searchText: string) {
    const filtered = this.destinations.filter(d =>
      d.name.toLowerCase().includes(searchText.toLowerCase())
    );
    this.itemsSubject.next(filtered); // оновлення поточного стану
  }
}
