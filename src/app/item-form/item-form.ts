import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-item-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink], // Імпортуємо модуль реактивних форм
  templateUrl: './item-form.html',
  styleUrls: ['./item-form.css']
})
export class ItemFormComponent {
  
  // Завдання 3: Створення FormGroup
  itemForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    country: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required, Validators.maxLength(100)]), // Короткий опис
    // Якщо ви додавали detailedDescription у минулій роботі, розкоментуйте рядок нижче:
    // detailedDescription: new FormControl('', [Validators.required, Validators.minLength(10)]),
    imageUrl: new FormControl('', [Validators.required]) // Для спрощення вводимо URL картинки вручну
  });

  constructor(
    private dataService: DataService,
    private router: Router
  ) {}

  // Завдання 6: Сабміт форми
  onSubmit() {
    if (this.itemForm.valid) {
      // Викликаємо метод сервісу
      this.dataService.addItem(this.itemForm.value);
      
      // Очищаємо форму та повертаємось на головну
      this.itemForm.reset();
      this.router.navigate(['/items']);
    } else {
      // Якщо форма невалідна, позначаємо всі поля як "touched", щоб показати помилки
      this.itemForm.markAllAsTouched();
    }
  }
}