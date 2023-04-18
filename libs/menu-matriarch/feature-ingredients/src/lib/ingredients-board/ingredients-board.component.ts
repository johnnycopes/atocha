import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ingredients-board',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ingredients-board.component.html',
  styleUrls: ['./ingredients-board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IngredientsBoardComponent {}
