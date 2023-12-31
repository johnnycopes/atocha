import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  standalone: true,
  selector: 'ui-flag',
  imports: [CommonModule],
  template: `<img class="flag" [src]="src" alt="Flag of {{ name }}" />`,
  styles: [
    `
      .flag {
        max-width: 192px;
        max-height: 128px;
      }
    `,
  ],
})
export class FlagComponent {
  @Input({ required: true }) src = '';
  @Input({ required: true }) name = '';
}
