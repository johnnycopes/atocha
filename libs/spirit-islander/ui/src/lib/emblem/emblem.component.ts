import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ui-emblem',
  standalone: true,
  imports: [CommonModule],
  template: `<ng-content></ng-content>`,
  styles: [
    `
      :host {
        display: inline-flex;
        justify-content: center;
        padding: 2px 0;
        width: 30px;
        font-size: 14px;
        background: var(--gray-400);
        border-radius: var(--border-radius);
        font-weight: 700;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmblemComponent {}
