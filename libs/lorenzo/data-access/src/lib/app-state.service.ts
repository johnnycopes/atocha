import { Injectable } from '@angular/core';

import { View } from '@atocha/lorenzo/util';
import { ViewService } from './_state/view.service';

@Injectable({
  providedIn: 'root'
})
export class AppStateService {
  view$ = this._viewService.view$;
  text$ = this._viewService.text$;

  constructor(private _viewService: ViewService) {}

  updateView(view: View): void {
    this._viewService.updateView(view);
  }

  updateText(text: string): void {
    this._viewService.updateText(text);
  }
}
