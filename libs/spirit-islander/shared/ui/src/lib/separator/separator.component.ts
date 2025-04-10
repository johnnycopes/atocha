import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ui-separator',
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
})
export class SeparatorComponent {}
