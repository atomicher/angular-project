import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DataService } from './data.service';
import { TravelDestination } from '../../shared/models/travel-destination.model';

describe('DataService', () => {
  let service: DataService;
  let httpMock: HttpTestingController;

  // Тестові дані
  const dummyDestinations: TravelDestination[] = [
    { id: 1, name: 'Париж', country: 'Франція', description: 'Тест', imageUrl: '', detailedDescription: '' },
    { id: 2, name: 'Київ', country: 'Україна', description: 'Тест', imageUrl: '', detailedDescription: '' }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // Імпортуємо модуль для тестування HTTP
      providers: [DataService]
    });
    service = TestBed.inject(DataService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Перевіряємо, що немає незавершених запитів
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve destinations via GET', () => {
    // Викликаємо метод завантаження
    service.loadDestinations();

    // Очікуємо, що був зроблений один запит на 'destinations'
    const req = httpMock.expectOne('destinations');
    expect(req.request.method).toBe('GET');

    // "Повертаємо" тестові дані з сервера
    req.flush(dummyDestinations);

    // Перевіряємо, чи оновився потік даних
    service.items$.subscribe(items => {
      expect(items.length).toBe(2);
      expect(items).toEqual(dummyDestinations);
    });
  });

  it('should retrieve a single destination by ID', () => {
    const dummyDestination = dummyDestinations[0];

    service.getDestinationById(1).subscribe(dest => {
      expect(dest).toEqual(dummyDestination);
    });

    const req = httpMock.expectOne('destinations/1');
    expect(req.request.method).toBe('GET');
    req.flush(dummyDestination);
  });
});