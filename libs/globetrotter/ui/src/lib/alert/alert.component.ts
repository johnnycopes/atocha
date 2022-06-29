import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'ui-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertComponent {
  @Input() type: 'success' | 'error' = 'error';
  @Input() large = false;
}
