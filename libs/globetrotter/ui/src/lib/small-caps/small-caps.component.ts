import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  ChangeDetectionStrategy,
  TemplateRef,
} from '@angular/core';

@Component({
  standalone: true,
  selector: 'ui-small-caps',
  imports: [CommonModule],
  templateUrl: './small-caps.component.html',
  styleUrls: ['./small-caps.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SmallCapsComponent {
  @Input() header = '';
  @Input() template: TemplateRef<unknown> | undefined;
}
