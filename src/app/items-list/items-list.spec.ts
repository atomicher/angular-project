import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ItemsListComponent } from './items-list';
import { DataService } from '../../app/core/services/data.service';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { ItemCardComponent } from '../item-card/item-card';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ItemsListComponent (Integration)', () => {
  let component: ItemsListComponent;
  let fixture: ComponentFixture<ItemsListComponent>;
  let dataService: DataService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ItemsListComponent, 
        HttpClientTestingModule, 
        FormsModule, 
        RouterTestingModule
      ],
      providers: [DataService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemsListComponent);
    component = fixture.componentInstance;
    dataService = TestBed.inject(DataService);
    
    fixture.detectChanges();
  });

  it('should call filterItems when onSearchChange is triggered', () => {
    // Створюємо шпигуна на метод filterItems
    const spy = spyOn(dataService, 'filterItems');
    const searchTerm = 'Київ';

    // Симулюємо виклик методу пошуку
    component.onSearchChange(searchTerm);

    // Перевіряємо, чи був викликаний метод сервісу з правильним параметром
    expect(spy).toHaveBeenCalledWith(searchTerm);
  });
});