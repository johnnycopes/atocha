import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavoritesComponent {}
