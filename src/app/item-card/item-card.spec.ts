import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing'; // Для роботи routerLink
import { ItemCardComponent   } from './item-card';
import { TravelDestination } from '../shared/models/travel-destination.model';

describe('ItemCard ', () => {
  let component: ItemCardComponent  ;
  let fixture: ComponentFixture<ItemCardComponent  >;

  const mockDestination: TravelDestination = {
    id: 10,
    name: 'Одеса',
    country: 'Україна',
    description: 'Перлина біля моря',
    imageUrl: 'assets/odesa.jpg',
    detailedDescription: 'Детальний опис...'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemCardComponent  , RouterTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemCardComponent  );
    component = fixture.componentInstance;
    
    // Передаємо дані в @Input
    component.destination = mockDestination;
    
    fixture.detectChanges(); // Оновлюємо HTML
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the correct name and country', () => {
    const h3 = fixture.debugElement.query(By.css('h3')).nativeElement;
    expect(h3.textContent).toContain('Одеса');
    expect(h3.textContent).toContain('(Україна)');
  });

  it('should display the "Рідна країна!" badge if country is Ukraine', () => {
    const badge = fixture.debugElement.query(By.css('.badge'));
    expect(badge).toBeTruthy();
    expect(badge.nativeElement.textContent).toContain('Рідна країна!');
  });

  it('should have correct routerLink to details page', () => {
    const link = fixture.debugElement.query(By.css('a.details-link'));
    // Перевіряємо, що атрибут href сформовано правильно
    expect(link.attributes['href']).toEqual('/items/10');
  });
});