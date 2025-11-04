import { Component } from '@angular/core';
import { ItemsListComponent } from '../items-list/items-list';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.html',
  styleUrls: ['./layout.css'],
  standalone: true,
  imports: [ItemsListComponent]
})
export class LayoutComponent {
  appTitle = 'Подорожі';
}
