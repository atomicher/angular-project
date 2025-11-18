import { Directive, HostBinding, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appHighlight]', // Атрибут, який ми будемо вішати на HTML теги
  standalone: true
})
export class HighlightDirective {
  
  // Дозволяємо передавати колір зовні, або використовуємо дефолтний (золотий)
  @Input() highlightColor: string = 'gold';

  // Прив'язуємось до стилю transform елемента
  @HostBinding('style.transform') transform: string = '';
  
  // Прив'язуємось до стилю border-color
  @HostBinding('style.borderColor') borderColor: string = '';

  // Слухаємо подію наведення миші
  @HostListener('mouseenter') onMouseEnter() {
    this.transform = 'scale(1.05)';
    this.borderColor = this.highlightColor;
  }

  // Слухаємо подію, коли миша покидає елемент
  @HostListener('mouseleave') onMouseLeave() {
    this.transform = 'scale(1)';
    this.borderColor = 'transparent'; // або повертаємо до початкового стану
  }
}