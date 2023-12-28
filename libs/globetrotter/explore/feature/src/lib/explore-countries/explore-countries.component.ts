import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-explore-countries',
  imports: [CommonModule],
  templateUrl: './explore-countries.component.html',
  styleUrls: ['./explore-countries.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExploreCountriesComponent {}
