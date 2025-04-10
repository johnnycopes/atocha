import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ui-emblem',
  imports: [CommonModule],
  template: `<ng-content></ng-content>`,
  styles: [
    `
      :host {
        display: inline-flex;
        justify-content: center;
        padding: 2px 0;
        width: 30px;
        font-size: 12px;
        background: var(--gray-400);
        border-radius: var(--border-radius);
        font-weight: 700;

        @media screen and (min-width: 768px) {
          font-size: 14px;
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmblemComponent {}
