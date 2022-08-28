import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BehaviorSubject, distinctUntilChanged, combineLatest, of, map } from 'rxjs';

import { SearchInputComponent, trackByFactory } from '@atocha/core/ui';
import { includes } from '@atocha/core/util';
import { DevelopmentComponent, LeaderComponent } from '@atocha/lorenzo/ui';
import { LEADERS, DEVELOPMENTS, Leader, Development } from '@atocha/lorenzo/util';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-shell',
  imports: [
    CommonModule,
    DevelopmentComponent,
    LeaderComponent,
    RouterModule,
    SearchInputComponent,
  ],
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShellComponent {
  private _textSubject = new BehaviorSubject<string>('');
  text$ = this._textSubject.pipe(distinctUntilChanged());
  showLeaders = true;
  showDevelopments = true;
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

  leaderTrackByFn = trackByFactory<Leader>(({ name }) => name);
  developmentTrackByFn = trackByFactory<Development>(({ id }) => id.toString());

  search(text: string): void {
    this._textSubject.next(text);
  }

  clear(): void {
    this._textSubject.next('');
  }
}
