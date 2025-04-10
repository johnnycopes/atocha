import { ChangeDetectionStrategy, Component } from '@angular/core';

import { BrowseComponent } from '@atocha/lorenzo/feature-browse';

@Component({
  selector: 'app-root',
  imports: [BrowseComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}
