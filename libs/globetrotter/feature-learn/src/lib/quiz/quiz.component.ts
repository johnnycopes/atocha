import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

import { QuizService, SelectService } from '@atocha/globetrotter/data-access';
import { Route, SelectionParams } from '@atocha/globetrotter/util';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuizComponent implements OnInit {
  vm$ = combineLatest([
    this._quizService.quiz$,
    this._selectService.selection$,
  ]).pipe(
    map(([quiz, { type }]) => ({
      quiz,
      type,
    }))
  );
  showCards = false;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _selectService: SelectService,
    private _quizService: QuizService
  ) {}

  ngOnInit(): void {
    this._route.queryParamMap.subscribe((queryParams) => {
      const params: SelectionParams = {
        type: queryParams.get('type') || '',
        quantity: queryParams.get('quantity') || '',
        model: queryParams.get('model') || '',
      };
      const selection = this._selectService.mapQueryParamsToSelection(params);
      this._selectService.updateSelection(selection);
      this._quizService.initializeQuiz(selection);
    });
  }

  async goBack(): Promise<void> {
    await this._router.navigate([Route.learn]);
  }

  onGuess(correctGuess: boolean): void {
    this._quizService.updateQuiz(correctGuess);
  }
}
