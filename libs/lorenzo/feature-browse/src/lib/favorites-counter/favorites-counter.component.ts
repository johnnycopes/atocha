import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { map } from 'rxjs';

import { PluralPipe } from '@atocha/core/ui';
import { FavoriteService } from '@atocha/lorenzo/data-access';

@Component({
  standalone: true,
  selector: 'app-favorites-counter',
  imports: [CommonModule, PluralPipe],
  templateUrl: './favorites-counter.component.html',
  styleUrls: ['./favorites-counter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavoritesCounterComponent {
  count$ = this._favoriteService.ids$.pipe(
    map(ids => {
      const value = Object.values(ids).reduce((accum, curr) => accum + curr.size, 0);
      return {
        display: value.toString(),
        value,
      }
    })
  );

  constructor(private _favoriteService: FavoriteService) {}

  onClear(): void {
    this._favoriteService.clearIds();
  }
}
