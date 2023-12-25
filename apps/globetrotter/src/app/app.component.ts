import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import {
  ErrorService,
  LoaderService,
  PlaceService,
} from '@atocha/globetrotter/shared/data-access';
import {
  ErrorComponent,
  LoaderComponent,
} from '@atocha/globetrotter/shared/ui';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [CommonModule, ErrorComponent, LoaderComponent, RouterOutlet],
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  loading$ = this._loaderService.global$;
  error$ = this._errorService.global$;

  constructor(
    private _loaderService: LoaderService,
    private _errorService: ErrorService,
    private _placeService: PlaceService
  ) {}

  ngOnInit(): void {
    this._placeService.init();
  }
}
