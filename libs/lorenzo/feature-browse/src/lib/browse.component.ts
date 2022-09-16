import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { combineLatest, map } from 'rxjs';

import { AppStateService, CardStateService } from '@atocha/lorenzo/data-access';
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
  constructor(
    private _appStateService: AppStateService,
    private _cardStateService: CardStateService,
  ) {}

  vm$ = combineLatest([
    this._appStateService.view$,
    this._cardStateService.ordinal$,
  ]).pipe(map(([view, ordinal]) => ({ view, ordinal })));
}
