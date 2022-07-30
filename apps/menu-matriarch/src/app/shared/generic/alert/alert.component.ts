import { Component, Input, ChangeDetectionStrategy, HostBinding, ViewEncapsulation } from '@angular/core';

type Alert = 'success' | 'warning' | 'error';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class AlertComponent {
  @Input() type: Alert = 'error';
  @Input() large = false;

  @HostBinding('class')
  public get hostClasses(): { [key: string]: boolean } {
    return {
      'app-alert': true,
      'app-alert--success': this.type === 'success',
      'app-alert--warning': this.type === 'warning',
      'app-alert--error': this.type === 'error',
      'app-alert--large': this.large
    };
  }
}
