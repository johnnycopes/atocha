import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  ChangeDetectionStrategy,
  TemplateRef,
} from '@angular/core';

@Component({
  selector: 'ui-small-caps',
  imports: [CommonModule],
  templateUrl: './small-caps.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SmallCapsComponent {
  @Input() header = '';
  @Input() template: TemplateRef<unknown> | undefined;
}
