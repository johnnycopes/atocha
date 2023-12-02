import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-spirit-islander-settings-feature',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './spirit-islander-settings-feature.component.html',
  styleUrls: ['./spirit-islander-settings-feature.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpiritIslanderSettingsFeatureComponent {}
