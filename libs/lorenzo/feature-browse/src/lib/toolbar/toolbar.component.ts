import { ChangeDetectionStrategy, Component } from '@angular/core';

import { AppStateService, CardStateService } from '@atocha/lorenzo/data-access';

@Component({
  standalone: true,
  selector: 'app-toolbar',
  imports: [],
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolbarComponent {
  constructor(
    private _appStateService: AppStateService,
    private _cardStateService: CardStateService,
  ) {}

  clearFavorites(): void {
    this._cardStateService.clearFavoriteIds();
  }

  expandAll(): void {
    this._cardStateService.expandAll();
  }

  collapseAll(): void {
    this._cardStateService.collapseAll();
  }
}
