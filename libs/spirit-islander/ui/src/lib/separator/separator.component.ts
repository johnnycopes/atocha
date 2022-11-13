import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ui-separator',
  standalone: true,
  imports: [CommonModule],
  template: `&#8203;`,
  styles: [
    `
      :host {
        display: inline-block;
        border-left: 2px solid var(--gray-400);
      }
    `,
  ],
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: {
    class: 'ui-separator',
  },
})
export class SeparatorComponent {}
