
import { Component, Input } from '@angular/core'; 
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router'; 
import { TravelDestination } from '../shared/models/travel-destination.model';

@Component({
  selector: 'app-item-card',
  standalone: true,
  imports: [CommonModule, RouterLink], 
  templateUrl: './item-card.html',
  styleUrls: ['./item-card.css'] 
})
export class ItemCardComponent {
  @Input() destination!: TravelDestination;

}