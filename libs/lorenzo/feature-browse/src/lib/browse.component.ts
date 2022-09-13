import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, TrackByFunction } from '@angular/core';
import {
  BehaviorSubject,
  distinctUntilChanged,
  combineLatest,
  map,
} from 'rxjs';

import { PluralPipe, trackByFactory } from '@atocha/core/ui';
import { includes } from '@atocha/core/util';
import { BrowseService } from '@atocha/lorenzo/data-access';
import { CardsComponent, CardTemplateDirective } from '@atocha/lorenzo/ui';
import {
  Card,
  getDevelopmentId,
  getFamilyId,
  getLeaderId,
  View,
} from '@atocha/lorenzo/util';
import { HeaderComponent } from './header/header.component';
import { DevelopmentsComponent } from './cards/development/developments.component';
import { FamiliesComponent } from './cards/family/families.component';
import { LeadersComponent } from './cards/leader/leaders.component';

@Component({
  standalone: true,
  selector: 'app-browse',
  imports: [
    CardsComponent,
    CardTemplateDirective,
    CommonModule,
    DevelopmentsComponent,
    FamiliesComponent,
    HeaderComponent,
    LeadersComponent,
    PluralPipe,
  ],
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BrowseComponent {
  private _textSubject = new BehaviorSubject<string>('');

  constructor(private _browseService: BrowseService) {}

  vm$ = combineLatest([
    this._textSubject.pipe(distinctUntilChanged()),
    this._browseService.view$,
    this._browseService.cards$,
    this._browseService.favoriteCardIds$,
  ]).pipe(
    map(
      ([
        text,
        view,
        { development: developments, family: families, leader: leaders },
        { development: developmentIds, family: familyIds, leader: leaderIds },
      ]) => ({
        text,
        view,
        families: {
          totalCards: families.length,
          filteredCards: families.filter((card) =>
            includes([getFamilyId(card)], text)
          ),
          favoriteIds: familyIds,
        },
        leaders: {
          totalCards: leaders.length,
          filteredCards: leaders.filter((card) =>
            includes([getLeaderId(card)], text)
          ),
          favoriteIds: leaderIds,
        },
        developments: {
          totalCards: developments.length,
          filteredCards: developments.filter((card) =>
            includes([getDevelopmentId(card)], text)
          ),
          favoriteIds: developmentIds,
        },
      })
    )
  );

  changeView(view: View): void {
    this._browseService.updateView(view);
    window.scroll(0, 0);
  }

  search(text: string): void {
    this._textSubject.next(text);
  }

  clearFavorites(): void {
    this._browseService.clearFavorites();
  }

  toggleId(id: string, type: Card): void {
    this._browseService.toggleFavoriteId(id, type);
  }
}
