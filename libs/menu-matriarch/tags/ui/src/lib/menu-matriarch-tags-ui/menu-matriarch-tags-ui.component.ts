import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ui-menu-matriarch-tags-ui',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menu-matriarch-tags-ui.component.html',
  styleUrl: './menu-matriarch-tags-ui.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuMatriarchTagsUiComponent {}
