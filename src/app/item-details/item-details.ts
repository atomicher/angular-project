
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Subscription, switchMap, map } from 'rxjs';
import { DataService } from '../services/data.service';
import { TravelDestination } from '../shared/models/travel-destination.model';

@Component({
  selector: 'app-item-details',
  standalone: true,
  imports: [CommonModule, RouterLink], 
  template: `
    <div *ngIf="destination" class="details-container">
      <a routerLink="/items" class="back-button">← Назад до списку</a> 
      <div class="content">
        <h2>{{ destination.name }} ({{ destination.country }})</h2>
        <img [src]="destination.imageUrl" [alt]="destination.name" class="detail-img">
        
        <p class="description">{{ destination.detailedDescription }}</p>

      </div>
    </div>
    <div *ngIf="!destination" class="loading-message">
      Завантаження... або елемент не знайдено.
    </div>
  `,
  styleUrls: ['./item-details.css']
})
export class ItemDetailsComponent implements OnInit, OnDestroy {
  
  destination: TravelDestination | undefined;
  private sub!: Subscription;


  constructor(
    private route: ActivatedRoute,
    private dataService: DataService 
  ) {}

  ngOnInit(): void {

    this.sub = this.route.paramMap.pipe(
      map(params => params.get('id')), 
      switchMap(idString => {
        const id = idString ? +idString : 0;
        return this.dataService.getDestinationById(id);
      })
    ).subscribe(dest => {
      this.destination = dest;
    });
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}