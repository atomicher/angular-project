import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TravelDestination } from '../shared/models/travel-destination.model';

@Component({
  selector: 'app-item-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './item-card.html',
  styleUrls: ['./item-card.css']
})
export class ItemCardComponent {
  @Input() destination!: TravelDestination;

  // Подія вибору
  @Output() selectDestination = new EventEmitter<TravelDestination>();

  // Метод, який спрацьовує при кліку
  onSelect(): void {
    this.selectDestination.emit(this.destination);
  }
}
