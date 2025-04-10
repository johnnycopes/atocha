import { ChangeDetectionStrategy, Component } from '@angular/core';

import { ButtonComponent } from '@atocha/core/ui';
import { CardStateService } from '@atocha/lorenzo/data-access';

@Component({
  selector: 'app-toolbar',
  imports: [ButtonComponent],
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolbarComponent {
  constructor(private _cardStateService: CardStateService) {}

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
