import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ErrorService, RouterService } from '@atocha/globetrotter/data-access';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  loading$: Observable<boolean>;
  error$: Observable<boolean>;

  constructor(
    private _routerService: RouterService,
    private _errorService: ErrorService
  ) {}

  ngOnInit(): void {
    this.loading$ = this._routerService.state.pipe(
      map(({ loading }) => loading)
    );
    this.error$ = this._errorService.errors.pipe(map(({ global }) => !!global));
  }
}
