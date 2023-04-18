import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IngredientsBoardColumnComponent } from './ingredients-board-column/ingredients-board-column.component';

@Component({
  selector: 'app-ingredients-board',
  standalone: true,
  imports: [CommonModule, IngredientsBoardColumnComponent],
  templateUrl: './ingredients-board.component.html',
  styleUrls: ['./ingredients-board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IngredientsBoardComponent {}
