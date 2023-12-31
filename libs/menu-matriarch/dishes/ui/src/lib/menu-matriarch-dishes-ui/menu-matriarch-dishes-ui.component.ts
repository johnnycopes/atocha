import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ui-menu-matriarch-dishes-ui',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menu-matriarch-dishes-ui.component.html',
  styleUrl: './menu-matriarch-dishes-ui.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuMatriarchDishesUiComponent {}
