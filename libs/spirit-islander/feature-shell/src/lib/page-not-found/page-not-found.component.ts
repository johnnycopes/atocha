import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageComponent } from '@atocha/spirit-islander/ui';

@Component({
  selector: 'app-page-not-found',
  standalone: true,
  imports: [CommonModule, PageComponent],
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageNotFoundComponent {}
