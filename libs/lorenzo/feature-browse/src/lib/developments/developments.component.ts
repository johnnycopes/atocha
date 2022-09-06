import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

import { trackByFactory } from '@atocha/core/ui';
import { Development } from '@atocha/lorenzo/util';
import { DevelopmentComponent, LeaderComponent } from '@atocha/lorenzo/ui';

@Component({
  standalone: true,
  selector: 'app-developments',
  imports: [CommonModule, DevelopmentComponent, LeaderComponent],
  templateUrl: 'developments.component.html',
  styleUrls: ['./developments.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DevelopmentsComponent {
  @Input() developments: Development[] = [];
  @Input() totalDevelopments = 0;
  @Input() favoriteDevelopments = new Set<string>();
  @Output() favoriteDevelopmentChange = new EventEmitter<string>();
  showDevelopments = true;
  developmentTrackByFn = trackByFactory<Development>(({ id }) => id.toString());
}
