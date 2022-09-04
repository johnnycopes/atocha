import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  BehaviorSubject,
  distinctUntilChanged,
  combineLatest,
  map,
} from 'rxjs';

import { includes } from '@atocha/core/util';
import { CardService } from '@atocha/lorenzo/data-access';
import { CardsComponent } from './cards/cards.component';
import { HeaderComponent } from './header/header.component';

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
  allLeaders$ = this._cardService.leaders$;
  allDevelopments$ = this._cardService.developments$;
  favoriteLeaders$ = this._cardService.favoriteLeaders$;
  favoriteDevelopments$ = this._cardService.favoriteDevelopments$;

  constructor(private _cardService: CardService) {
    this._cardService.favoriteLeaders$.subscribe(console.log);
    this._cardService.favoriteDevelopments$.subscribe(console.log);
  }

  vm$ = combineLatest([
    this.text$,
    this._cardService.leaders$,
    this._cardService.developments$,
    this._cardService.favoriteLeaderIds$,
    this._cardService.favoriteDevelopmentIds$,
  ]).pipe(
    map(([text, leaders, developments, favoriteLeaders, favoriteDevelopments]) => ({
      text,
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

  onFavoriteLeaderChange([id, state]: [string, boolean]): void {
    this._cardService.updateFavoriteLeader(id, state);
  }

  onFavoriteDevelopmentChange([id, state]: [string, boolean]): void {
    this._cardService.updateFavoriteDevelopment(id, state);
  }
}
