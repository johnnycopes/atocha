import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { trackByFactory } from '@atocha/core/ui';
import { CardsComponent, CardTemplateDirective } from '@atocha/lorenzo/ui';
import { getLeaderId, Leader } from '@atocha/lorenzo/util';
import { LeaderComponent } from './leader.component';

@Component({
  standalone: true,
  selector: 'app-leaders',
  imports: [CardsComponent, CardTemplateDirective, CommonModule, LeaderComponent],
  templateUrl: './leaders.component.html',
  styleUrls: ['./leaders.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LeadersComponent {
  @Input() leaders: readonly Leader[] = [];
  @Input() total = 0;
  @Input() favoriteIds = new Set<string>();
  @Output() toggleId = new EventEmitter<string>();
  getId = getLeaderId;
  trackByFn = trackByFactory(this.getId);
}
