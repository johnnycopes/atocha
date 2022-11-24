import { ChangeDetectionStrategy, Component } from '@angular/core';
import { combineLatest, map } from 'rxjs';

import { SearchInputComponent } from '@atocha/core/ui';
import { AppStateService } from '@atocha/lorenzo/data-access';
import { View } from '@atocha/lorenzo/util';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'header[app-header]',
  imports: [CommonModule, SearchInputComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  vm$ = combineLatest([
    this._appStateService.view$,
    this._appStateService.text$,
  ]).pipe(map(([view, text]) => ({ view, text })));

  constructor(private _appStateService: AppStateService) {
    this._appStateService.exportFamilies();
  }

  onViewChange(view: View): void {
    this._appStateService.updateView(view);
    window.scroll(0, 0);
  }

  onTextChange(text: string): void {
    this._appStateService.updateText(text);
  }

  export() {
    this._appStateService.exportFamilies();
  }
}
