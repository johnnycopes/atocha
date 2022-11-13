import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ui-expansion-emblem',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './expansion-emblem.component.html',
  styleUrls: ['./expansion-emblem.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExpansionEmblemComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
