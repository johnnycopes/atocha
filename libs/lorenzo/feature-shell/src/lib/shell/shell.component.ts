import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BehaviorSubject, distinctUntilChanged, combineLatest, of, map } from 'rxjs';

import { SearchInputComponent } from '@atocha/core/ui';
import { includes } from '@atocha/core/util';
import { LEADERS, DEVELOPMENTS } from '@atocha/lorenzo/util';
import { CardsComponent } from '../cards/cards.component';

@Component({
  standalone: true,
  selector: 'app-shell',
  imports: [
    CommonModule,
    RouterModule,
    CardsComponent,
    SearchInputComponent,
  ],
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShellComponent {
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

  search(text: string): void {
    this._textSubject.next(text);
  }

  clear(): void {
    this._textSubject.next('');
  }
}
