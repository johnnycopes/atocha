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
  ordinal$ = this._browseService.ordinal$;
  totalFavorites$ = this._browseService.totalFavorites$;

  clearFavorites(): void {
    this._browseService.clearFavorites();
  }
}
