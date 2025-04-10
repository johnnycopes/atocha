import { ChangeDetectionStrategy, Component } from '@angular/core';
import { combineLatest, map } from 'rxjs';

import { ButtonComponent, SearchInputComponent } from '@atocha/core/ui';
import { AppStateService } from '@atocha/lorenzo/data-access';
import { View } from '@atocha/lorenzo/util';
import { CommonModule } from '@angular/common';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'header[app-header]',
  imports: [ButtonComponent, CommonModule, SearchInputComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  vm$ = combineLatest([
    this._appStateService.view$,
    this._appStateService.text$,
  ]).pipe(map(([view, text]) => ({ view, text })));

  constructor(private _appStateService: AppStateService) {}

  onViewChange(view: View): void {
    this._appStateService.updateView(view);
    window.scroll(0, 0);
  }

  onTextChange(text: string): void {
    this._appStateService.updateText(text);
  }

  exportCsv(): void {
    this._appStateService.exportCsv();
  }
}
