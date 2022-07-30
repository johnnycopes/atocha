import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'app-empty-view-placeholder',
  templateUrl: './empty-view-placeholder.component.html',
  styleUrls: ['./empty-view-placeholder.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmptyViewPlaceholderComponent {
  @Input() headerText = '';
  @Input() messageText = '';
}
