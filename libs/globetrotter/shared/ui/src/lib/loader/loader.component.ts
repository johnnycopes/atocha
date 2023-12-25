import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  standalone: true,
  selector: 'ui-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoaderComponent {}
