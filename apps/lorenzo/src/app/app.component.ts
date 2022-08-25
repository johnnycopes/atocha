import { ChangeDetectionStrategy, Component } from '@angular/core';

import { trackByFactory } from '@atocha/core/ui';
import { includes } from '@atocha/core/util';

import { Development, DEVELOPMENTS, Leader, LEADERS } from '@atocha/lorenzo/util';
import { BehaviorSubject, combineLatest, of } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  private _textSubject = new BehaviorSubject<string>('');
  text$ = this._textSubject.pipe(
    distinctUntilChanged(),
  );
  showLeaders = true;
  showDevelopments = true;
  readonly leaders = LEADERS;
  readonly developments = DEVELOPMENTS;

  vm$ = combineLatest([
    this.text$,
    of(LEADERS),
    of(DEVELOPMENTS),
  ]).pipe(
    map(([text, leaders, developments]) => ({
      text,
      filteredLeaders: leaders.filter(({ name }) =>
        includes([name], text)
      ),
      filteredDevelopments: developments.filter(({ id }) =>
        includes([id.toString()], text)
      ),
    }))
  );

  leaderTrackByFn = trackByFactory<Leader>(({ name }) => name);
  developmentTrackByFn = trackByFactory<Development>(({ id }) => id.toString());

  search(text: string): void {
    this._textSubject.next(text);
  }
}

