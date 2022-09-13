import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { trackByFactory } from '@atocha/core/ui';
import { CardsComponent, CardTemplateDirective } from '@atocha/lorenzo/ui';
import { Family, getFamilyId } from '@atocha/lorenzo/util';
import { FamilyComponent } from './family.component';

@Component({
  standalone: true,
  selector: 'app-families',
  imports: [CardsComponent, CardTemplateDirective, CommonModule, FamilyComponent],
  templateUrl: './families.component.html',
  styleUrls: ['./families.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FamiliesComponent {
  @Input() families: readonly Family[] = [];
  @Input() total = 0;
  @Input() favoriteIds = new Set<string>();
  @Output() toggleId = new EventEmitter<string>();
  getId = getFamilyId;
  trackByFn = trackByFactory(this.getId);
}
