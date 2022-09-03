import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'ui-card-header',
  imports: [CommonModule],
  template: `
    <ng-content></ng-content>
  `,
  styles: [`
    :host {
      display: block;
      padding: 4px;
      border-radius: var(--border-radius) var(--border-radius) 0 0;
      border-bottom: 1px solid var(--font-color);
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardHeaderComponent {
}
