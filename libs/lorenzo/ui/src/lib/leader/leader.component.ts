import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ui-leader',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './leader.component.html',
  styleUrls: ['./leader.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LeaderComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
