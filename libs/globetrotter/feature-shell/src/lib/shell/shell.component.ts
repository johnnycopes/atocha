import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { map, distinctUntilChanged } from 'rxjs/operators';

import { QuizService } from '@atocha/globetrotter/data-access';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShellComponent {
  private _showContentSubject = new BehaviorSubject<boolean>(false);
  private _showContent$ = this._showContentSubject.pipe(distinctUntilChanged());
  private _quizComplete$ = this._quizService.quiz.pipe(
    map((quiz) => quiz?.isComplete ?? false),
    distinctUntilChanged()
  );
  vm$ = combineLatest([this._showContent$, this._quizComplete$]).pipe(
    map(([showContent, quizComplete]) => ({
      showContent,
      quizComplete,
    }))
  );

  constructor(private _quizService: QuizService) {}

  onNavigationReady(): void {
    this._showContentSubject.next(true);
  }
}
