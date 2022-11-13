import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ui-difficulty-emblem',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './difficulty-emblem.component.html',
  styleUrls: ['./difficulty-emblem.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DifficultyEmblemComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
