import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { QuizService, SelectService } from '@atocha/data-access-globetrotter';
import { SelectionParams } from '@atocha/types-globetrotter';



@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuizComponent implements OnInit {
  showCards = false;

  constructor(
    private _route: ActivatedRoute,
    private _selectService: SelectService,
    private _quizService: QuizService
  ) {}

  public ngOnInit(): void {
    this._route.queryParamMap.subscribe((queryParams) => {
      const params: SelectionParams = {
        type: queryParams.get('type') || '',
        quantity: queryParams.get('quantity') || '',
        countries: queryParams.get('countries') || '',
      };
      const selection = this._selectService.mapQueryParamsToSelection(params);
      this._selectService.updateSelection(selection);
      this._quizService.initializeQuiz(selection);
    });
  }
}
