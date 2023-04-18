import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ingredient-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ingredient-card.component.html',
  styleUrls: ['./ingredient-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IngredientCardComponent {}
