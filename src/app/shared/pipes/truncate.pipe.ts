import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate',
  standalone: true // Важливо для Standalone компонентів
})
export class TruncatePipe implements PipeTransform {

  // limit - максимальна довжина (за замовчуванням 50 символів)
  transform(value: string, limit: number = 50): string {
    if (!value) return '';
    
    if (value.length <= limit) {
      return value;
    }
    
    return value.substring(0, limit) + '...';
  }
}