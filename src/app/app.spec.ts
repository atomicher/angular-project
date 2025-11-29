import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { provideRouter } from '@angular/router'; // Додаємо провайдер роутера

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      // Оскільки App використовує <router-outlet>, йому потрібен провайдер роутера в тестах
      providers: [provideRouter([])] 
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  // Тест 'should render title' видалено, бо в App більше немає заголовка
});