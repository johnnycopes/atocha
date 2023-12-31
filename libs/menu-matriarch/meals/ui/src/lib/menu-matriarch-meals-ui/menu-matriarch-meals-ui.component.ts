import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ui-menu-matriarch-meals-ui',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menu-matriarch-meals-ui.component.html',
  styleUrl: './menu-matriarch-meals-ui.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuMatriarchMealsUiComponent {}
