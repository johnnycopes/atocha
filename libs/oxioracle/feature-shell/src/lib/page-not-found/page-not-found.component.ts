import { Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-page-not-found',
  template: `
    <div class="container center">
      <h2 data-test="page-not-found">Page not found!</h2>
    </div>
  `,
  styles: `.center { display: flex; justify-content: center }`,
})
export class PageNotFoundComponent {}
