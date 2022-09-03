import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  BehaviorSubject,
  distinctUntilChanged,
  combineLatest,
  map,
} from 'rxjs';

import { includes } from '@atocha/core/util';
import { CardService, SettingService } from '@atocha/lorenzo/data-access';
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

  constructor(
    private _cardService: CardService,
    private _settingService: SettingService,
  ) {}

  vm$ = combineLatest([
    this.text$,
    this._cardService.leaders$,
    this._cardService.developments$,
    this._settingService.state$,
  ]).pipe(
    map(([text, leaders, developments, { showFavorites }]) => ({
      text,
      filteredLeaders: leaders.filter(({ name }) => includes([name], text)),
      filteredDevelopments: developments.filter(({ id }) =>
        includes([id.toString()], text)
      ),
      totalLeaders: leaders.length,
      totalDevelopments: developments.length,
      showFavorites,
    }))
  );

  onSearch(text: string): void {
    this._textSubject.next(text);
  }
}
