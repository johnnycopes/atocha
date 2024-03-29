import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  standalone: true,
  selector: 'ui-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TagComponent {
  @Input() id = '';
  @Input() name = '';
  @Input() color = '';
}
