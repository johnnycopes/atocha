import { Component, Input, ChangeDetectionStrategy, TemplateRef } from '@angular/core';

@Component({
  selector: 'ui-small-caps',
  templateUrl: './small-caps.component.html',
  styleUrls: ['./small-caps.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SmallCapsComponent {
  @Input() header = '';
  @Input() template: TemplateRef<unknown> | undefined;
}
