import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BehaviorSubject, distinctUntilChanged, combineLatest, of, map } from 'rxjs';

import { includes } from '@atocha/core/util';
import { LEADERS, DEVELOPMENTS } from '@atocha/lorenzo/util';
import { CardsComponent } from './cards/cards.component';
import { HeaderComponent } from './header/header.component';
import { CommonModule } from '@angular/common';

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
  readonly leaders = LEADERS;
  readonly developments = DEVELOPMENTS;

  vm$ = combineLatest([this.text$, of(LEADERS), of(DEVELOPMENTS)]).pipe(
    map(([text, leaders, developments]) => ({
      text,
      filteredLeaders: leaders.filter(({ name }) => includes([name], text)),
      filteredDevelopments: developments.filter(({ id }) =>
        includes([id.toString()], text)
      ),
    }))
  );

  onSearch(text: string): void {
    this._textSubject.next(text);
  }
}
