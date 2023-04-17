import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'atocha-menu-matriarch-feature-ingredients',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menu-matriarch-feature-ingredients.component.html',
  styleUrls: ['./menu-matriarch-feature-ingredients.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuMatriarchFeatureIngredientsComponent {}
