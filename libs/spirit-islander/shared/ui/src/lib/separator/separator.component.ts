import { Component } from '@angular/core';

@Component({
  selector: 'ui-separator',
  imports: [],
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
