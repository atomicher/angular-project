import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators'; // Додано map
import { TravelDestination } from '../shared/models/travel-destination.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private http = inject(HttpClient);
  private endpoint = 'destinations';

  private itemsSubject = new BehaviorSubject<TravelDestination[]>([]);
  items$: Observable<TravelDestination[]> = this.itemsSubject.asObservable();

  loadDestinations(): void {
    this.http.get<TravelDestination[]>(this.endpoint)
      .pipe(catchError(this.handleError))
      .subscribe(data => {
        this.itemsSubject.next(data);
      });
  }

  getItems(): Observable<TravelDestination[]> {
    this.loadDestinations();
    return this.items$;
  }

  getDestinationById(id: number): Observable<TravelDestination | undefined> {
    return this.http.get<TravelDestination>(`${this.endpoint}/${id}`)
      .pipe(catchError(this.handleError));
  }

  addItem(newItem: any): void {
    const itemToAdd = { 
      ...newItem, 
      id: String(Date.now()) 
    };

    this.http.post<TravelDestination>(this.endpoint, itemToAdd)
      .pipe(catchError(this.handleError))
      .subscribe(() => {
        this.loadDestinations();
      });
  }

  // ОНОВЛЕНИЙ МЕТОД ФІЛЬТРАЦІЇ
  filterItems(searchText: string): void {
    let params = new HttpParams();

    if (searchText) {
      params = params.set('name_like', searchText);
    }

    this.http.get<TravelDestination[]>(this.endpoint, { params })
      .pipe(
        // ДОДАНО: Примусова фільтрація на клієнті, якщо сервер повернув зайве
        map(items => {
          if (!searchText) return items;
          return items.filter(d => 
            d.name.toLowerCase().includes(searchText.toLowerCase())
          );
        }),
        catchError(this.handleError)
      )
      .subscribe(data => {
        this.itemsSubject.next(data);
      });
  }

  private handleError(error: HttpErrorResponse) {
    console.error('API Error:', error);
    return throwError(() => new Error('Щось пішло не так, спробуйте пізніше.'));
  }
}