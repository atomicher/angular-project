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
      description: 'Місто кохання.', //
      imageUrl: 'assets/paris.jpg',
      // Додаємо детальний опис
      detailedDescription: 'Париж - це світова столиця моди, мистецтва та гастрономії. Відвідайте Ейфелеву вежу, прогуляйтеся по Монмартру та насолодіться шедеврами Лувру.'
    },
    {
      id: 2,
      name: 'Київ',
      country: 'Україна',
      description: 'Столиця України.', //
      imageUrl: 'assets/kyiv.jpg',
      // Додаємо детальний опис
      detailedDescription: 'Київ - одне з найстаріших міст Європи, розташоване на берегах Дніпра. Відомий своєю архітектурою, золотоверхими соборами та багатою історією.'
    },
    {
      id: 3,
      name: 'Токіо',
      country: 'Японія',
      description: 'Місто майбутнього.', //
      imageUrl: 'assets/tokyo.jpg',
      detailedDescription: 'Токіо поєднує ультрасучасні технології та хмарочоси з давніми традиційними храмами. Відчуйте неймовірний ритм життя на перехресті Сібуя.'
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

  getDestinationById(id: number): Observable<TravelDestination | undefined> {
    const destination = this.destinations.find(d => d.id === id);
    return of(destination);
  }
  // Реактивна фільтрація
  filterItems(searchText: string) {
    const filtered = this.destinations.filter(d =>
      d.name.toLowerCase().includes(searchText.toLowerCase())
    );
    this.itemsSubject.next(filtered); // оновлення поточного стану
  }
}
