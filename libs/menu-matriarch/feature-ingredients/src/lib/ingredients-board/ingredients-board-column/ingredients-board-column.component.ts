import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ingredients-board-column',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ingredients-board-column.component.html',
  styleUrls: ['./ingredients-board-column.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IngredientsBoardColumnComponent {}
