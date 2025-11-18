import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TravelDestination } from '../shared/models/travel-destination.model';
import { TruncatePipe } from '../shared/pipes/truncate.pipe'; // 1. Імпорт
import { HighlightDirective } from '../shared/directives/highlight.directive'; // 1. Імпорт

@Component({
  selector: 'app-item-card',
  standalone: true,
  imports: [CommonModule, RouterLink, TruncatePipe, HighlightDirective], // 2. Додаємо в imports
  templateUrl: './item-card.html',
  styleUrls: ['./item-card.css']
})
export class ItemCardComponent {
  @Input() destination!: TravelDestination;
}
