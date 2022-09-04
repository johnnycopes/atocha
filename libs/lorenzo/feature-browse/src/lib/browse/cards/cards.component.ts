import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { trackByFactory } from '@atocha/core/ui';
import { Leader, Development } from '@atocha/lorenzo/util';
import { DevelopmentComponent, LeaderComponent } from '@atocha/lorenzo/ui';

@Component({
  standalone: true,
  selector: 'app-cards',
  imports: [CommonModule, DevelopmentComponent, LeaderComponent],
  templateUrl: 'cards.component.html',
  styleUrls: ['./cards.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardsComponent {
  @Input() leaders: Leader[] = [];
  @Input() totalLeaders = 0;
  @Input() developments: Development[] = [];
  @Input() totalDevelopments = 0;
  @Input() showFavorites = false;
  @Input() favoriteLeaders = new Map<string, boolean>();
  @Input() favoriteDevelopments = new Map<string, boolean>();
  @Output() favoriteLeaderChange = new EventEmitter<[string, boolean]>();
  @Output() favoriteDevelopmentChange = new EventEmitter<[string, boolean]>();
  showLeaders = true;
  showDevelopments = true;
  leaderTrackByFn = trackByFactory<Leader>(({ name }) => name);
  developmentTrackByFn = trackByFactory<Development>(({ id }) => id.toString());
}
