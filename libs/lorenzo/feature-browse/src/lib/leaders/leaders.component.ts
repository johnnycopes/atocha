import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

import { trackByFactory } from '@atocha/core/ui';
import { Leader } from '@atocha/lorenzo/util';
import { LeaderComponent } from '@atocha/lorenzo/ui';

@Component({
  standalone: true,
  selector: 'app-leaders',
  imports: [CommonModule, LeaderComponent],
  templateUrl: 'leaders.component.html',
  styleUrls: ['./leaders.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LeadersComponent {
  @Input() leaders: Leader[] = [];
  @Input() totalLeaders = 0;
  @Input() favoriteLeaders = new Set<string>();
  @Output() favoriteLeaderChange = new EventEmitter<string>();
  showLeaders = true;
  leaderTrackByFn = trackByFactory<Leader>(({ name }) => name);
}
