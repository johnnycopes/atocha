import { CommonModule } from '@angular/common';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, map } from 'rxjs';

import { ROUTES } from '@atocha/globetrotter/shared/data-access';
import {
  QuizService,
  SelectService,
} from '@atocha/globetrotter/learn/data-access';
import { QuizMenuComponent } from './quiz-menu/quiz-menu.component';
import { QuizCardsComponent } from './quiz-cards/quiz-cards.component';

@Component({
  selector: 'app-quiz',
  imports: [CommonModule, QuizCardsComponent, QuizMenuComponent],
  templateUrl: './quiz.component.html',
  styles: [
    `
      :host {
        display: block;
        height: 100%;
        overflow: auto;
      }
    `,
  ],
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
      const selection = this._selectService.mapQueryParamsToSelection({
        type: queryParams.get('type') || '',
        quantity: queryParams.get('quantity') || '',
        places: queryParams.get('places') || '',
      });
      this._selectService.updateSelection(selection);
      this._quizService.initializeQuiz(selection);
    });
  }

  async goBack(): Promise<void> {
    await this._router.navigate([ROUTES.learn]);
  }

  onGuess(correctGuess: boolean): void {
    this._quizService.updateQuiz(correctGuess);
  }
}
