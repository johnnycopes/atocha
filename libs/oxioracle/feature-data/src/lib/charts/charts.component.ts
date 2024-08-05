import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';

import { ChartsService } from './charts.service';

@Component({
  standalone: true,
  selector: 'app-charts',
  imports: [BaseChartDirective, CommonModule],
  providers: [ChartsService],
  templateUrl: './charts.component.html',
  styleUrl: './charts.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartsComponent {
  barChart$ = this._chartsService.barChart$;
  pieChart$ = this._chartsService.pieChart$;

  constructor(private _chartsService: ChartsService) {}
}
