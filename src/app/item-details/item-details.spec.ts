import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ItemDetailsComponent } from './item-details';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../app/core/services/data.service';
import { of } from 'rxjs';

describe('ItemDetailsComponent', () => {
  let component: ItemDetailsComponent;
  let fixture: ComponentFixture<ItemDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemDetailsComponent],
      providers: [
        // Мокаємо ActivatedRoute
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of({ get: (key: string) => '1' }) // Імітуємо ID=1 в URL
          }
        },
        // Мокаємо DataService
        {
          provide: DataService,
          useValue: {
            getDestinationById: () => of({ id: 1, name: 'Test', country: 'Test', imageUrl: '' })
          }
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});