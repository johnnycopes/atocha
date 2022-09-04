import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  BehaviorSubject,
  distinctUntilChanged,
  combineLatest,
  map,
  switchMap,
} from 'rxjs';

import { includes } from '@atocha/core/util';
import { CardService } from '@atocha/lorenzo/data-access';
import { CardsComponent } from './cards/cards.component';
import { HeaderComponent } from './header/header.component';
import { View } from './mode.type';

@Component({
  standalone: true,
  selector: 'app-browse',
  imports: [CardsComponent, CommonModule, HeaderComponent],
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BrowseComponent {
  private _textSubject = new BehaviorSubject<string>('');
  text$ = this._textSubject.pipe(distinctUntilChanged());

  private _viewSubject = new BehaviorSubject<View>('all');
  view$ = this._viewSubject.pipe(distinctUntilChanged());

  leaders$ = this._viewSubject.pipe(
    switchMap(view => view === 'all' ? this._cardService.leaders$ : this._cardService.favoriteLeaders$)
  );

  developments$ = this._viewSubject.pipe(
    switchMap(view => view === 'all' ? this._cardService.developments$ : this._cardService.favoriteDevelopments$)
  );

  constructor(private _cardService: CardService) {}

  vm$ = combineLatest([
    this.text$,
    this.view$,
    this.leaders$,
    this.developments$,
    this._cardService.favoriteLeaderIds$,
    this._cardService.favoriteDevelopmentIds$,
  ]).pipe(
    map(([text, view, leaders, developments, favoriteLeaders, favoriteDevelopments]) => ({
      text,
      view,
      filteredLeaders: leaders.filter(({ name }) => includes([name], text)),
      filteredDevelopments: developments.filter(({ id }) =>
        includes([id.toString()], text)
      ),
      totalLeaders: leaders.length,
      totalDevelopments: developments.length,
      favoriteLeaders,
      favoriteDevelopments,
    }))
  );

  onSearch(text: string): void {
    this._textSubject.next(text);
  }

  onViewChange(view: View): void {
    this._viewSubject.next(view);
  }

  onFavoriteLeaderChange(id: string): void {
    this._cardService.updateFavoriteLeader(id);
  }

  onFavoriteDevelopmentChange(id: string): void {
    this._cardService.updateFavoriteDevelopment(id);
  }
}
