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
import { DevelopmentComponent } from './cards/development/development.component';
import { FamilyComponent } from './cards/family/family.component';
import { LeaderComponent } from './cards/leader/leader.component';
import { FamiliesComponent } from './cards/family/families.component';

@Component({
  standalone: true,
  selector: 'app-browse',
  imports: [
    CardTemplateDirective,
    CardsComponent,
    CommonModule,
    DevelopmentComponent,
    HeaderComponent,
    FamiliesComponent,
    FamilyComponent,
    LeaderComponent,
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
        families: this._createData({
          type: 'family',
          cards: families,
          searchText: text,
          favoriteIds: familyIds,
          getId: getFamilyId,
        }),
        leaders: this._createData({
          type: 'leader',
          cards: leaders,
          searchText: text,
          favoriteIds: leaderIds,
          getId: getLeaderId,
        }),
        developments: this._createData({
          type: 'development',
          cards: developments,
          searchText: text,
          favoriteIds: developmentIds,
          getId: getDevelopmentId,
        }),
      })
    )
  );

  clearFavorites(): void {
    this._browseService.clearFavorites();
  }

  search(text: string): void {
    this._textSubject.next(text);
  }

  changeView(view: View): void {
    this._browseService.updateView(view);
    window.scroll(0, 0);
  }

  private _createData<T>({ type, cards, searchText, favoriteIds, getId }: {
    type: Card,
    cards: readonly T[],
    searchText: string,
    favoriteIds: Set<string>,
    getId: (card: T) => string,
  }): {
    type: Card,
    totalCards: number,
    filteredCards: readonly T[],
    favoriteIds: Set<string>,
    getId: (card: T) => string,
    toggleId: (id: string) => void
    trackByFn: TrackByFunction<T>,
  } {
    return {
      type,
      totalCards: cards.length,
      filteredCards: cards.filter((card) =>
        includes([getId(card)], searchText)
      ),
      favoriteIds,
      getId,
      toggleId: (id) => this._browseService.toggleFavoriteId(id, type),
      trackByFn: trackByFactory<T>(getId),
    };
  }
}
