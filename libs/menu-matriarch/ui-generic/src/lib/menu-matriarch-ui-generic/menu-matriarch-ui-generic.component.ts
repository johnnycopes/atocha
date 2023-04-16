import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'atocha-menu-matriarch-ui-generic',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menu-matriarch-ui-generic.component.html',
  styleUrls: ['./menu-matriarch-ui-generic.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuMatriarchUiGenericComponent {}
