import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'core-select-players',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './select-players.component.html',
  styleUrls: ['./select-players.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectPlayersComponent {}
