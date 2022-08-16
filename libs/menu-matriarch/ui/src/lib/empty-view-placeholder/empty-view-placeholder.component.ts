import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  standalone: true,
  selector: 'ui-empty-view-placeholder',
  templateUrl: './empty-view-placeholder.component.html',
  styleUrls: ['./empty-view-placeholder.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmptyViewPlaceholderComponent {
  @Input() headerText = '';
  @Input() messageText = '';
}
