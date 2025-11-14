import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';   
import { ItemCardComponent } from '../item-card/item-card';
import { TravelDestination } from '../shared/models/travel-destination.model';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-items-list',
  standalone: true,
  templateUrl: './items-list.html',
  styleUrls: ['./items-list.css'],
  imports: [CommonModule, FormsModule, ItemCardComponent]   
})
export class ItemsListComponent implements OnInit {

  destinations: TravelDestination[] = [];
  searchTerm: string = '';   // 

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.destinations = this.dataService.getItems();
  }

  onDestinationSelected(dest: TravelDestination) {
    console.log('Обраний елемент:', dest);
  }

  get filteredDestinations(): TravelDestination[] {
    return this.destinations.filter(d =>
      d.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

}
