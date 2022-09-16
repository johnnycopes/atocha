import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { BrowseService } from '@atocha/lorenzo/data-access';
import { Card } from '@atocha/lorenzo/util';
import { HeaderComponent } from './header/header.component';
import { DevelopmentsComponent } from './cards/developments/developments.component';
import { FamiliesComponent } from './cards/families/families.component';
import { FavoritesCounterComponent } from './favorites-counter/favorites-counter.component';
import { LeadersComponent } from './cards/leaders/leaders.component';

@Component({
  standalone: true,
  selector: 'app-browse',
  imports: [
    CommonModule,
    DevelopmentsComponent,
    FamiliesComponent,
    FavoritesCounterComponent,
    HeaderComponent,
    LeadersComponent,
  ],
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BrowseComponent {

  constructor(private _browseService: BrowseService) {}

  vm$ = this._browseService.vm$;

  moveDown(type: Card): void {
    this._browseService.moveDown(type);
  }

  moveUp(type: Card): void {
    this._browseService.moveUp(type);
  }

  clearFavorites(): void {
    this._browseService.clearFavorites();
  }

  toggleId(id: string, type: Card): void {
    this._browseService.toggleFavoriteId(id, type);
  }
}
