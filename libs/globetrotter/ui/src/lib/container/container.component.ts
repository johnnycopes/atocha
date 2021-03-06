import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'ui-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContainerComponent {}
