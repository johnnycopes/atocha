import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-list-item',
  template: `
    <h1>{{ name }}!!!</h1>
    <p>{{ description }}</p>
  `,
  styles: [
    `
      h1 {
        color: cadetblue;
      }

      p {
        background: goldenrod;
      }
    `,
  ],
})
export class ListItemComponent {
  @Input() name = '';
  @Input() description = '';
}
