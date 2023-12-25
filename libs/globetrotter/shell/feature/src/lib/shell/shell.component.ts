import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { map, distinctUntilChanged } from 'rxjs/operators';

import { LoaderService, QuizService } from '@atocha/globetrotter/data-access';
import { LoaderComponent } from '@atocha/globetrotter/ui';
import { NavigationComponent } from '../navigation/navigation.component';

@Component({
  standalone: true,
  selector: 'app-shell',
  imports: [CommonModule, LoaderComponent, NavigationComponent, RouterModule],
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShellComponent {
  private _navReadySubject = new BehaviorSubject<boolean>(false);
  private _navReady$ = this._navReadySubject.pipe(distinctUntilChanged());
  private _quizComplete$ = this._quizService.quiz$.pipe(
    map((quiz) => quiz?.isComplete ?? false),
    distinctUntilChanged()
  );
  private _loading$ = this._loaderService.shell$;

  vm$ = combineLatest([
    this._navReady$,
    this._quizComplete$,
    this._loading$,
  ]).pipe(
    map(([showContent, quizComplete, loading]) => ({
      loading,
      ready: showContent && !loading,
      quizComplete,
    }))
  );

  constructor(
    private _loaderService: LoaderService,
    private _quizService: QuizService
  ) {}

  onNavReady(): void {
    this._navReadySubject.next(true);
  }
}
